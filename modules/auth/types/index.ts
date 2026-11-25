export interface UserRecord {
  id: string;
  nama: string;
  email: string;
  password_hash: string;
  email_terverifikasi: number | boolean;
  dibuat_pada: string;
  updated_at?: string;
}

export interface EmailOtpRecord {
  id: string;
  user_id: string;
  kode_hash: string;
  dibuat_pada: string;
  kedaluwarsa_pada: string;
  digunakan: number | boolean;
  jumlah_percobaan?: number;
  tidak_berlaku?: number | boolean;
}

export interface UserProfile {
  id: string;
  nama: string;
  email: string;
  email_terverifikasi: boolean;
}

export interface AuthActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: {
    email?: string;
    redirectTo?: string;
    otpDebug?: string;
    [key: string]: any;
  };
}

export interface BusinessProfileRecord {
  id: string;
  user_id: string;
  nama_bisnis: string;
  badan_hukum: string;
  sektor: string;
  kebutuhan_dana: number;
  kondisi_dokumen: string;
  jangka_waktu_bulan: number;
  tujuan_pendanaan: string;
  rencana_penggunaan: string;
  penjelasan_penggunaan: string;
  dokumen_pendukung_url?: string | null;
  status_draf: number | boolean;
  platform_tujuan_id?: string | null;
  diperbarui_pada: string;
}

export interface ProfileActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: Partial<BusinessProfileRecord> & {
    isDraft?: boolean;
    redirectTo?: string;
  };
}

/**
 * Tipe Data Domain SCOUT (Securities Crowdfunding Companion)
 */
export type SektorUsaha =
  | "fnb"
  | "ritel"
  | "manufaktur"
  | "jasa"
  | "agrikultur"
  | "kesehatan"
  | "teknologi";

export type BentukBadanHukum = "PT" | "CV" | "BELUM_BERBADAN_HUKUM";

export type StatusLaporanKeuangan =
  | "audited_2_tahun"
  | "internal_2_tahun"
  | "internal_1_tahun"
  | "sederhana_kas";

export type TargetPendanaan =
  | "bawah_500jt"
  | "500jt_2m"
  | "2m_5m"
  | "5m_10m";

export type JenisInstrumen = "SAHAM" | "SUKUK" | "OBLIGASI_EKUITAS";

export type TingkatKesiapan = "SIAP_KURASI" | "BUTUH_PERBAIKAN" | "BELUM_SIAP";

export interface UkmAssessmentInput {
  namaBisnis: string;
  sektor: SektorUsaha;
  badanHukum: BentukBadanHukum;
  usiaOperasionalTahun: number;
  laporanKeuangan: StatusLaporanKeuangan;
  targetPendanaan: TargetPendanaan;
}

export interface DokumenWajibItem {
  id: string;
  kategori: "LEGALITAS" | "KEUANGAN" | "OPERASIONAL" | "PROSPEKTUS";
  nama: string;
  wajib: boolean;
  status: "LENGKAP" | "PERLU_REVISI" | "BELUM_DIUNGGAH";
  catatanKorektif: string;
}

export interface ScfPlatformMitra {
  id: string;
  nama: string;
  fokusSektor: string[];
  instrumen: JenisInstrumen[];
  rentangDana: string;
  matchScore: number;
  keunggulan: string;
}

export interface ScfAssessmentResult {
  skorKesiapan: number; // 0 - 100
  tingkatKesiapan: TingkatKesiapan;
  labelTingkat: string;
  warnaBadge: string;
  rekomendasiInstrumen: JenisInstrumen;
  labelInstrumen: string;
  penjelasanInstrumen: string;
  estimasiPersiapanMinggu: number;
  checklistDokumen: DokumenWajibItem[];
  platformRekomendasi: ScfPlatformMitra[];
  poinKunci: string[];
}

export interface DashboardMetric {
  overallScore: number;
  totalDokumen: number;
  dokumenLengkap: number;
  dokumenRevisi: number;
  dokumenKosong: number;
  persentaseSelesai: number;
}
