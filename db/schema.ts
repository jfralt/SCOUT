/**
 * Skema Database SCOUT (Securities Crowdfunding Companion)
 * Dapat dipetakan ke SQLite via Prisma ORM atau query builder lainnya.
 */

export interface UkmProfileModel {
  id: string;
  namaBisnis: string;
  badanHukum: "PT" | "CV" | "BELUM_BERBADAN_HUKUM";
  sektor: string;
  lamaOperasionalTahun: number;
  kontakPerson?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DokumenPersyaratanModel {
  id: string;
  ukmId: string;
  kategori: "LEGALITAS" | "KEUANGAN" | "OPERASIONAL" | "PROSPEKTUS";
  namaDokumen: string;
  fileUrl?: string;
  fileSizeBytes?: number;
  status: "LENGKAP" | "PERLU_REVISI" | "BELUM_DIUNGGAH" | "SEDANG_DITINJAU";
  catatanRevisi?: string;
  terakhirDiperbarui: Date;
}

export interface AssessmentLogModel {
  id: string;
  ukmId: string;
  readinessScore: number; // 0 - 100
  tingkatKesiapan: "SIAP_KURASI" | "BUTUH_PERBAIKAN" | "BELUM_SIAP";
  rekomendasiInstrumen: "SAHAM" | "SUKUK" | "OBLIGASI_EKUITAS";
  targetDanaNominal: number;
  matchedPlatformJson: string;
  createdAt: Date;
}

export interface PlatformScfMitraModel {
  id: string;
  nama: string;
  izinOjkNomor: string;
  fokusSektor: string[];
  instrumen: string[];
  rentangDanaMin: number;
  rentangDanaMax: number;
  isAktif: boolean;
}
