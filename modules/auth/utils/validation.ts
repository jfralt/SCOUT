import { z } from "zod";

// Skema Validasi Registrasi (US-01 / W-02)
export const registerSchema = z
  .object({
    nama: z
      .string()
      .trim()
      .min(1, "Kolom ini wajib diisi.")
      .min(2, "Nama lengkap minimal 2 karakter."),
    email: z
      .string()
      .trim()
      .min(1, "Kolom ini wajib diisi.")
      .email("Format email tidak valid."),
    password: z
      .string()
      .min(1, "Kolom ini wajib diisi.")
      .min(8, "Password minimal 8 karakter, kombinasi huruf dan angka.")
      .regex(/^(?=.*[A-Za-z])(?=.*\d)/, "Password minimal 8 karakter, kombinasi huruf dan angka."),
    confirmPassword: z
      .string()
      .min(1, "Konfirmasi kata sandi wajib diisi."),
    termsAccepted: z
      .boolean()
      .refine((val) => val === true, "Anda harus menyetujui Syarat & Ketentuan dan Kebijakan Privasi."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok.",
    path: ["confirmPassword"],
  });

// Skema Validasi Login (US-01 / W-04)
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi.")
    .email("Format email tidak valid."),
  password: z
    .string()
    .min(1, "Kata sandi wajib diisi."),
});

// Skema Validasi Verifikasi OTP (US-01 / US-24)
export const otpVerificationSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Format email tidak valid."),
  kode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Kode OTP harus berupa 6 digit angka."),
});

// Skema Validasi Profil Bisnis & Kebutuhan Dana (US-02)
export const businessProfileSchema = z.object({
  nama_bisnis: z
    .string()
    .trim()
    .min(1, "Nama bisnis wajib diisi.")
    .min(2, "Nama bisnis minimal 2 karakter."),
  badan_hukum: z
    .string()
    .min(1, "Bentuk badan hukum wajib dipilih."),
  sektor: z
    .string()
    .min(1, "Sektor usaha wajib dipilih."),
  kebutuhan_dana: z
    .number()
    .min(50000000, "Minimum pengajuan dana adalah Rp 50.000.000."),
  kondisi_dokumen: z
    .string()
    .min(1, "Kondisi dokumen wajib dipilih."),
  jangka_waktu_bulan: z
    .number()
    .default(12),
  tujuan_pendanaan: z
    .string()
    .min(1, "Tujuan pendanaan wajib dipilih."),
  rencana_penggunaan: z
    .string()
    .min(1, "Rencana penggunaan dana wajib dipilih."),
  penjelasan_penggunaan: z
    .string()
    .trim()
    .min(1, "Uraian rencana penggunaan dana wajib diisi.")
    .min(10, "Uraian rencana penggunaan minimal 10 karakter."),
});
