"use server";

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { revalidatePath } from "next/cache";
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
  getUserConsent,
  saveUserConsent,
  getAllDocumentRequirements,
  getUserDocuments,
  getUserDocumentByRequirement,
  saveUserDocument,
  getAggregatedUserDocuments,
  getAllPlatforms,
  calculatePlatformMatchmaking,
  computeDashboardMetrics,
} from "./utils/db";
import { setSessionCookie, clearSessionCookie, getSessionUser } from "./utils/session";
import {
  AuthActionResult,
  UserProfile,
  BusinessProfileRecord,
  ProfileActionResult,
  DocumentActionResult,
  DocumentWithRequirement,
  MatchmakingPlatformResult,
  DashboardMetric,
} from "./types";

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
    const remaining = 5 - attempts;
    return {
      success: false,
      message: `Kode verifikasi salah. Sisa kesempatan mencoba: ${remaining} kali.`,
    };
  }

  // Tandai OTP digunakan dan set email terverifikasi (US-01 AC4, US-24 AC2 & AC5)
  markOtpAsUsed(latestOtp.id);
  setUserEmailVerified(user.id);

  // Buat sesi login otomatis
  await setSessionCookie({
    id: user.id,
    nama: user.nama,
    email: user.email,
    email_terverifikasi: true,
  });

  return {
    success: true,
    message: "Email berhasil diverifikasi! Mengalihkan ke dasbor...",
    data: {
      email: user.email,
      redirectTo: "/dashboard",
    },
  };
}

/**
 * Server Action: Kirim Ulang Kode OTP (US-24 AC6 / W-VE.3)
 */
export async function resendOtpAction(email: string): Promise<AuthActionResult> {
  const user = findUserByEmail(email);
  if (!user) {
    return {
      success: false,
      message: "Pengguna dengan email ini tidak ditemukan.",
    };
  }

  const rawOtp = generateSixDigitOtp();
  const otpHash = hashOtp(rawOtp);
  createEmailOtp(user.id, otpHash, 10);

  console.log(`[SCOUT DEV EMAIL RESEND] Kode OTP baru untuk ${email}: ${rawOtp}`);

  return {
    success: true,
    message: "Kode verifikasi OTP baru telah dikirimkan ke email Anda.",
    data: {
      otpDebug: process.env.NODE_ENV !== "production" ? rawOtp : undefined,
    },
  };
}

/**
 * Server Action: Masuk Akun / Login (US-01 / W-04)
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
      message: "Format email atau kata sandi tidak valid.",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validationResult.data;
  const user = findUserByEmail(email);

  if (!user) {
    return {
      success: false,
      message: "Email atau kata sandi yang Anda masukkan salah.",
    };
  }

  const isPasswordValid = verifyPassword(password, user.password_hash);
  if (!isPasswordValid) {
    return {
      success: false,
      message: "Email atau kata sandi yang Anda masukkan salah.",
    };
  }

  const isVerified = user.email_terverifikasi === 1 || user.email_terverifikasi === true;

  await setSessionCookie({
    id: user.id,
    nama: user.nama,
    email: user.email,
    email_terverifikasi: isVerified,
  });

  return {
    success: true,
    message: "Berhasil masuk ke akun SCOUT.",
    data: {
      redirectTo: "/dashboard",
    },
  };
}

/**
 * Server Action: Keluar Akun / Logout
 */
export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  revalidatePath("/");
  return;
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
 * Server Action: Simpan profil bisnis & target pendanaan (US-02 / US-27)
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
    jenis_efek: formData.get("jenis_efek")?.toString() || "SAHAM",
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
  revalidatePath("/dashboard");
  revalidatePath("/matchmaking");

  return {
    success: true,
    message: "Profil bisnis dan target kebutuhan dana berhasil disimpan!",
    data: { ...saved, isDraft: false },
  };
}

/**
 * Server Action: Berikan Persetujuan Kebijakan Privasi (US-17 / US-04 AC2)
 */
export async function giveConsentAction(jenis: string = "pemrosesan_data_pribadi"): Promise<{ success: boolean; message?: string }> {
  const user = await getSessionUser();
  if (!user) {
    return { success: false, message: "Sesi Anda telah berakhir. Silakan login kembali." };
  }

  saveUserConsent(user.id, jenis, true);
  revalidatePath("/dashboard");
  return { success: true, message: "Persetujuan kebijakan privasi berhasil disimpan." };
}

/**
 * Server Action: Unggah atau Ganti Dokumen Persyaratan (US-04 / W-04.4 - W-04.10)
 */
export async function uploadDocumentAction(
  prevState: DocumentActionResult | null,
  formData: FormData
): Promise<DocumentActionResult> {
  const user = await getSessionUser();
  if (!user) {
    return {
      success: false,
      message: "Sesi Anda telah berakhir. Silakan login kembali.",
    };
  }

  // US-04 AC1: Email wajib terverifikasi
  if (!user.email_terverifikasi) {
    return {
      success: false,
      message: "Unggahan ditolak. Alamat email Anda belum terverifikasi. Silakan lakukan verifikasi OTP terlebih dahulu.",
    };
  }

  // US-04 AC2: Cek persetujuan privasi/pemrosesan data pribadi
  const hasConsent = getUserConsent(user.id, "pemrosesan_data_pribadi");
  if (!hasConsent) {
    return {
      success: false,
      message: "CONSENT_REQUIRED",
    };
  }

  const requirementId = formData.get("requirementId")?.toString();
  const file = formData.get("file") as File | null;

  if (!requirementId) {
    return {
      success: false,
      message: "Persyaratan dokumen tidak valid.",
    };
  }

  if (!file || typeof file === "string" || file.size === 0) {
    return {
      success: false,
      message: "Pilih file yang ingin diunggah terlebih dahulu.",
    };
  }

  // US-04 AC4 & W-04.6: Validasi format (PDF, JPG, PNG) & ukuran maksimal 5 MB (5 * 1024 * 1024)
  const fileName = file.name;
  const ext = path.extname(fileName).toLowerCase();
  const allowedExts = [".pdf", ".jpg", ".jpeg", ".png"];

  if (!allowedExts.includes(ext)) {
    return {
      success: false,
      message: "Format file tidak didukung. Gunakan PDF, JPG, atau PNG.",
    };
  }

  const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
  if (file.size > maxSizeBytes) {
    return {
      success: false,
      message: "Ukuran file melebihi 5 MB. Pilih file yang lebih kecil.",
    };
  }

  const ukuranKb = Math.round(file.size / 1024);

  // Simpan file ke direktori uploads
  try {
    const uploadDir = path.resolve(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const safeFileName = `${user.id}_${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const filePath = path.join(uploadDir, safeFileName);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    const lokasiFile = `/uploads/${safeFileName}`;

    // US-04 AC3 & AC6: Simpan dokumen atau ganti file lama, status menjadi lengkap
    const doc = saveUserDocument(
      user.id,
      requirementId,
      fileName,
      lokasiFile,
      ukuranKb,
      "lengkap",
      "Dokumen berhasil diunggah dan sedang dalam antrean kurasi."
    );

    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Dokumen "${fileName}" berhasil diunggah!`,
      data: doc,
    };
  } catch (error) {
    console.error("Error saving uploaded file:", error);
    return {
      success: false,
      message: "Terjadi kesalahan pada sistem saat menyimpan berkas. Silakan coba lagi.",
    };
  }
}

/**
 * Server Action: Perbarui Status Kurasi Dokumen (untuk simulasi peninjauan/kurasi)
 */
export async function updateDocumentStatusAction(
  documentId: string,
  newStatus: "lengkap" | "perlu_revisi" | "valid",
  catatan?: string
): Promise<{ success: boolean; message: string }> {
  const user = await getSessionUser();
  if (!user) {
    return { success: false, message: "Akses ditolak." };
  }

  const db = (await import("./utils/db")).getDatabase();
  const now = new Date().toISOString();
  db.prepare(`
    UPDATE documents 
    SET status = ?, catatan = ?, diperbarui_pada = ? 
    WHERE id = ? AND user_id = ?
  `).run(newStatus, catatan || null, now, documentId, user.id);

  revalidatePath("/dashboard");
  return { success: true, message: "Status kurasi berhasil diperbarui." };
}

/**
 * Server Action: Ambil data agregasi dashboard secara lengkap
 */
export async function getMyDashboardDataAction(): Promise<{
  profile: BusinessProfileRecord | null;
  aggregatedDocs: DocumentWithRequirement[];
  matchmaking: MatchmakingPlatformResult[];
  metrics: DashboardMetric;
  hasConsent: boolean;
} | null> {
  const user = await getSessionUser();
  if (!user) return null;

  const profile = getBusinessProfileByUserId(user.id);
  const aggregatedDocs = getAggregatedUserDocuments(user.id);
  const matchmaking = calculatePlatformMatchmaking(profile);
  const metrics = computeDashboardMetrics(profile, aggregatedDocs, matchmaking);
  const hasConsent = getUserConsent(user.id, "pemrosesan_data_pribadi");

  return {
    profile,
    aggregatedDocs,
    matchmaking,
    metrics,
    hasConsent,
  };
}

/**
 * Server Action: Ambil data hasil kecocokan penyelenggara SCF (US-05)
 */
export async function getMyMatchmakingAction(): Promise<{
  isProfileComplete: boolean;
  profile: BusinessProfileRecord | null;
  matchmaking: MatchmakingPlatformResult[];
} | null> {
  const user = await getSessionUser();
  if (!user) return null;

  const profile = getBusinessProfileByUserId(user.id);

  // Aturan database-us-05: Keputusan "Profil sudah lengkap?" benar bila
  // badan_hukum, sektor, kebutuhan_dana, dan kondisi_dokumen terisi (AC4)
  const isProfileComplete = Boolean(
    profile &&
    profile.badan_hukum &&
    profile.sektor &&
    profile.kebutuhan_dana > 0 &&
    profile.kondisi_dokumen
  );

  const matchmaking = isProfileComplete ? calculatePlatformMatchmaking(profile) : [];

  return {
    isProfileComplete,
    profile,
    matchmaking,
  };
}

/**
 * Server Action: Ambil detail penyelenggara SCF (US-35 / US-08)
 */
export async function getPlatformDetailAction(platformId: string): Promise<{
  platform: any;
  isPremium: boolean;
  isCurrentlySelected: boolean;
} | null> {
  const user = await getSessionUser();
  if (!user) return null;

  const { getPlatformById, getUserTier, getBusinessProfileByUserId } = await import("./utils/db");
  const platform = getPlatformById(platformId);
  if (!platform) return null;

  const userTier = getUserTier(user.id);
  const isPremium = userTier !== "FREE";

  const profile = getBusinessProfileByUserId(user.id);
  const isCurrentlySelected = profile?.platform_tujuan_id === platformId;

  // Jika akun FREE, sembunyikan kolom lengkap di server (US-35 AC3)
  const sanitizedPlatform = isPremium
    ? platform
    : {
        id: platform.id,
        nama: platform.nama,
        fokus_sektor: platform.fokus_sektor,
        deskripsi: platform.deskripsi,
        keunggulan: platform.keunggulan,
        diperbarui_pada: platform.diperbarui_pada,
        // Kolom lengkap disembunyikan di sisi server
        profil_singkat: null,
        persyaratan_umum: null,
        tahapan_proses: null,
        estimasi_biaya: platform.estimasi_biaya,
        jenis_efek_didukung: platform.jenis_efek_didukung,
      };

  return {
    platform: sanitizedPlatform,
    isPremium,
    isCurrentlySelected,
  };
}

/**
 * Server Action: Pilih Penyelenggara Sebagai Tujuan (US-35 AC4 / D7)
 */
export async function selectPlatformAction(platformId: string): Promise<{ success: boolean; message: string }> {
  const user = await getSessionUser();
  if (!user) {
    return { success: false, message: "Sesi Anda telah berakhir. Silakan login kembali." };
  }

  const { selectPlatformAsTarget } = await import("./utils/db");
  selectPlatformAsTarget(user.id, platformId);

  revalidatePath("/dashboard");
  revalidatePath("/matchmaking");
  revalidatePath(`/platforms/${platformId}`);

  return {
    success: true,
    message: "Penyelenggara berhasil dipilih sebagai tujuan penerbitan!",
  };
}

/**
 * Server Action: Upgrade Simulasi Tingkat Layanan Akun (US-08 AC4)
 */
export async function upgradeTierAction(newTier: "PREMIUM" | "CONSULTING" | "FULL_SERVICE" = "PREMIUM"): Promise<{ success: boolean; message: string }> {
  const user = await getSessionUser();
  if (!user) {
    return { success: false, message: "Sesi Anda telah berakhir." };
  }

  const { upgradeUserTier } = await import("./utils/db");
  upgradeUserTier(user.id, newTier);

  revalidatePath("/dashboard");
  revalidatePath("/matchmaking");

  return {
    success: true,
    message: `Akun Anda berhasil ditingkatkan ke tingkat ${newTier}! Seluruh fitur kurasi telah terbuka.`,
  };
}

