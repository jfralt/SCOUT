"use server";

import crypto from "node:crypto";
import { redirect } from "next/navigation";
import { registerSchema, loginSchema, otpVerificationSchema, businessProfileSchema } from "./utils/validation";
import { hashPassword, verifyPassword, hashOtp, verifyOtp } from "./utils/hash";
import {
  findUserByEmail,
  createUser,
  setUserEmailVerified,
  createEmailOtp,
  getLatestOtpForUser,
  markOtpAsUsed,
  incrementOtpAttempts,
  invalidateOtp,
  getBusinessProfileByUserId,
  saveBusinessProfile,
} from "./utils/db";
import { setSessionCookie, clearSessionCookie, getSessionUser } from "./utils/session";
import { AuthActionResult, UserProfile, BusinessProfileRecord, ProfileActionResult } from "./types";

/**
 * Helper untuk men-generate kode OTP 6-digit acak
 */
function generateSixDigitOtp(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

/**
 * Server Action: Registrasi Akun Baru (US-01 / W-02)
 */
export async function registerAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    nama: formData.get("nama")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
    termsAccepted: formData.get("termsAccepted") === "on" || formData.get("termsAccepted") === "true",
  };

  const validationResult = registerSchema.safeParse(rawData);
  if (!validationResult.success) {
    const errorMap = validationResult.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Pendaftaran gagal. Periksa kembali data Anda.",
      errors: errorMap,
    };
  }

  const { nama, email, password } = validationResult.data;

  // AC2: Periksa apakah email sudah terdaftar
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return {
      success: false,
      message: "Pendaftaran gagal. Periksa kembali data Anda.",
      errors: {
        email: ["Email sudah terdaftar. Gunakan email lain atau masuk."],
      },
    };
  }

  // AC5: Password di-hash sebelum disimpan
  const passwordHash = hashPassword(password);
  const newUser = createUser(nama, email, passwordHash);

  // Alur OTP: Generate 6 digit OTP & simpan hash
  const rawOtp = generateSixDigitOtp();
  const otpHash = hashOtp(rawOtp);
  createEmailOtp(newUser.id, otpHash, 10); // Masa berlaku 10 menit

  // Log simulasi pengiriman email untuk mode development
  console.log(`[SCOUT DEV EMAIL] Kode verifikasi OTP untuk ${email}: ${rawOtp}`);

  return {
    success: true,
    message: "Pendaftaran berhasil! Silakan masukkan kode verifikasi yang telah dikirimkan.",
    data: {
      email: newUser.email,
      redirectTo: `/verify-otp?email=${encodeURIComponent(newUser.email)}`,
      otpDebug: process.env.NODE_ENV !== "production" ? rawOtp : undefined,
    },
  };
}

/**
 * Server Action: Verifikasi Kode OTP (US-01 / US-24)
 */
export async function verifyOtpAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email")?.toString() || "",
    kode: formData.get("kode")?.toString() || "",
  };

  const validationResult = otpVerificationSchema.safeParse(rawData);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Kode verifikasi tidak valid.",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, kode } = validationResult.data;
  const user = findUserByEmail(email);

  if (!user) {
    return {
      success: false,
      message: "Pengguna tidak ditemukan. Silakan lakukan pendaftaran ulang.",
    };
  }

  // Ambil kode OTP terbaru
  const latestOtp = getLatestOtpForUser(user.id);
  if (!latestOtp || latestOtp.digunakan === 1) {
    return {
      success: false,
      message: "Kode OTP tidak valid atau sudah digunakan. Silakan kirim ulang kode.",
    };
  }

  // Periksa apakah kode OTP kedaluwarsa (J8)
  const now = new Date();
  const expiresAt = new Date(latestOtp.kedaluwarsa_pada);
  if (now > expiresAt) {
    return {
      success: false,
      message: "Kode OTP telah kedaluwarsa. Silakan tekan tombol Kirim Ulang untuk mendapatkan kode baru.",
    };
  }

  // Verifikasi hash kode OTP (J7 / US-24 AC3 & AC4)
  const isMatch = verifyOtp(kode, latestOtp.kode_hash);
  if (!isMatch) {
    const attempts = incrementOtpAttempts(latestOtp.id);
    if (attempts >= 5) {
      invalidateOtp(latestOtp.id);
      return {
        success: false,
        message: "Batas 5 kali percobaan telah tercapai. Kode OTP ini tidak berlaku lagi. Silakan tekan Kirim Ulang untuk meminta kode baru.",
      };
    }
    return {
      success: false,
      message: `Kode verifikasi salah (Percobaan ${attempts}/5). Periksa kembali 6 digit kode Anda.`,
    };
  }

  // Tandai OTP digunakan dan verifikasi status email user
  markOtpAsUsed(latestOtp.id);
  setUserEmailVerified(user.id);

  // Buat sesi login aktif untuk pengguna
  await setSessionCookie({
    id: user.id,
    nama: user.nama,
    email: user.email,
    email_terverifikasi: true,
  });

  return {
    success: true,
    message: "Verifikasi berhasil!",
    data: {
      redirectTo: "/",
    },
  };
}

/**
 * Server Action: Kirim Ulang Kode OTP (J9)
 */
export async function resendOtpAction(email: string): Promise<AuthActionResult> {
  if (!email || !email.includes("@")) {
    return {
      success: false,
      message: "Alamat email tidak valid.",
    };
  }

  const user = findUserByEmail(email);
  if (!user) {
    return {
      success: false,
      message: "Pengguna tidak ditemukan.",
    };
  }

  // Generate kode OTP baru
  const rawOtp = generateSixDigitOtp();
  const otpHash = hashOtp(rawOtp);
  createEmailOtp(user.id, otpHash, 10);

  console.log(`[SCOUT DEV EMAIL RESEND] Kode verifikasi OTP baru untuk ${email}: ${rawOtp}`);

  return {
    success: true,
    message: "Kode verifikasi baru telah dikirimkan ke email Anda.",
    data: {
      email,
      otpDebug: process.env.NODE_ENV !== "production" ? rawOtp : undefined,
    },
  };
}

/**
 * Server Action: Login Pengguna (US-01 / W-04 / W-05)
 */
export async function loginAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const rawData = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const validationResult = loginSchema.safeParse(rawData);
  if (!validationResult.success) {
    return {
      success: false,
      message: "Email atau kata sandi tidak valid.",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data;

  // AC3 & AC4: Validasi kredensial pengguna
  const user = findUserByEmail(email);
  if (!user) {
    return {
      success: false,
      message: "Email atau kata sandi tidak valid.",
    };
  }

  const isPasswordValid = verifyPassword(password, user.password_hash);
  if (!isPasswordValid) {
    return {
      success: false,
      message: "Email atau kata sandi tidak valid.",
    };
  }

  // Jika akun belum diverifikasi, arahkan ke verifikasi OTP
  if (!user.email_terverifikasi) {
    // Generate kode baru agar pengguna langsung bisa verifikasi
    const rawOtp = generateSixDigitOtp();
    const otpHash = hashOtp(rawOtp);
    createEmailOtp(user.id, otpHash, 10);
    console.log(`[SCOUT DEV EMAIL UNVERIFIED LOGIN] OTP untuk ${email}: ${rawOtp}`);

    return {
      success: true,
      message: "Email Anda belum diverifikasi. Silakan masukkan kode OTP.",
      data: {
        email: user.email,
        redirectTo: `/verify-otp?email=${encodeURIComponent(user.email)}`,
        otpDebug: process.env.NODE_ENV !== "production" ? rawOtp : undefined,
      },
    };
  }

  // Buat sesi login
  await setSessionCookie({
    id: user.id,
    nama: user.nama,
    email: user.email,
    email_terverifikasi: true,
  });

  return {
    success: true,
    message: "Login berhasil!",
    data: {
      redirectTo: "/",
    },
  };
}

/**
 * Server Action: Logout
 */
export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/");
}

/**
 * Utility Server: Ambil data sesi pengguna saat ini
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  return await getSessionUser();
}

/**
 * Server Action: Ambil data profil bisnis pengguna saat ini (US-02)
 */
export async function getMyBusinessProfileAction(): Promise<BusinessProfileRecord | null> {
  const user = await getSessionUser();
  if (!user) return null;
  return getBusinessProfileByUserId(user.id);
}

/**
 * Server Action: Simpan profil bisnis & target pendanaan (US-02)
 */
export async function saveBusinessProfileAction(
  prevState: ProfileActionResult | null,
  formData: FormData
): Promise<ProfileActionResult> {
  const user = await getSessionUser();
  if (!user) {
    return {
      success: false,
      message: "Sesi Anda telah berakhir. Silakan login kembali.",
      data: { redirectTo: "/login" },
    };
  }

  const actionType = formData.get("action_type")?.toString() || "submit";
  const rawKebutuhanDana = formData.get("kebutuhan_dana")?.toString().replace(/[^0-9]/g, "") || "0";
  const kebutuhanDanaNum = Number(rawKebutuhanDana);

  const rawData = {
    nama_bisnis: formData.get("nama_bisnis")?.toString() || "",
    badan_hukum: formData.get("badan_hukum")?.toString() || "",
    sektor: formData.get("sektor")?.toString() || "",
    kebutuhan_dana: kebutuhanDanaNum,
    kondisi_dokumen: formData.get("kondisi_dokumen")?.toString() || "",
    jangka_waktu_bulan: Number(formData.get("jangka_waktu_bulan") || 12),
    tujuan_pendanaan: formData.get("tujuan_pendanaan")?.toString() || "Pengembangan Usaha",
    rencana_penggunaan: formData.get("rencana_penggunaan")?.toString() || "",
    penjelasan_penggunaan: formData.get("penjelasan_penggunaan")?.toString() || "",
    dokumen_pendukung_url: formData.get("dokumen_pendukung_name")?.toString() || null,
  };

  // Simpan Draf Sementara (Flowchart US-02)
  if (actionType === "save_draft") {
    const saved = saveBusinessProfile(user.id, rawData, true);
    return {
      success: true,
      message: "Draf profil berhasil disimpan sementara.",
      data: { ...saved, isDraft: true },
    };
  }

  // Simpan dan Lanjut / Kirim Pengajuan: Validasi Wajib
  const validation = businessProfileSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      message: "Penyimpanan gagal. Mohon lengkapi seluruh kolom wajib yang bertanda (*).",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const saved = saveBusinessProfile(user.id, validation.data, false);
  return {
    success: true,
    message: "Profil bisnis dan target kebutuhan dana berhasil disimpan!",
    data: { ...saved, isDraft: false },
  };
}
