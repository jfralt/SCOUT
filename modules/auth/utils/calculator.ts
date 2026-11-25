import {
  UkmAssessmentInput,
  ScfAssessmentResult,
  DokumenWajibItem,
  ScfPlatformMitra,
  JenisInstrumen,
  TingkatKesiapan,
} from "../types";

/**
 * Daftar platform SCF berizin resmi OJK yang bermitra sebagai preferensi matchmaking
 */
export const DAFTAR_PLATFORM_SCF: ScfPlatformMitra[] = [
  {
    id: "bizhare",
    nama: "Bizhare",
    fokusSektor: ["fnb", "ritel", "jasa", "kesehatan"],
    instrumen: ["SAHAM", "SUKUK"],
    rentangDana: "Rp 500 Jt - Rp 10 M",
    matchScore: 95,
    keunggulan: "Jaringan investor ritel terbesar untuk F&B dan ritel waralaba nasional.",
  },
  {
    id: "santara",
    nama: "Santara",
    fokusSektor: ["fnb", "agrikultur", "manufaktur", "ritel"],
    instrumen: ["SAHAM"],
    rentangDana: "Rp 1 M - Rp 10 M",
    matchScore: 92,
    keunggulan: "Pelopor SCF di Indonesia dengan rekam jejak industri riil dan manufaktur.",
  },
  {
    id: "shafiq",
    nama: "Shafiq",
    fokusSektor: ["agrikultur", "manufaktur", "jasa", "kesehatan", "fnb"],
    instrumen: ["SUKUK"],
    rentangDana: "Rp 1 M - Rp 10 M",
    matchScore: 90,
    keunggulan: "Penyelenggara SCF Syariah murni dengan fokus penerbitan Sukuk Ijarah & Mudharabah.",
  },
  {
    id: "landx",
    nama: "LBS Urun Dana (LandX)",
    fokusSektor: ["ritel", "manufaktur", "jasa", "fnb"],
    instrumen: ["SAHAM", "SUKUK"],
    rentangDana: "Rp 1 M - Rp 10 M",
    matchScore: 88,
    keunggulan: "Kurasi ketat dengan likuiditas tinggi untuk bisnis yang telah berbadan hukum PT mapan.",
  },
  {
    id: "fundex",
    nama: "FundEx",
    fokusSektor: ["teknologi", "jasa", "kesehatan", "ritel"],
    instrumen: ["SAHAM", "OBLIGASI_EKUITAS"],
    rentangDana: "Rp 500 Jt - Rp 5 M",
    matchScore: 84,
    keunggulan: "Sangat fleksibel untuk sektor ekonomi kreatif, teknologi, dan inovasi jasa.",
  },
];

/**
 * Mesin Penilaian Kesiapan SCF (SCF Readiness Scoring Engine)
 * Mengacu pada ketentuan POJK No. 57/POJK.04/2020:
 * 1. Legalitas badan hukum PT (wajib mutlak bagi penawaran efek ekuitas/saham)
 * 2. Laporan keuangan historis
 * 3. Lama operasional bisnis
 * 4. Skalabilitas nominal target
 */
export function evaluasiKesiapanScf(input: UkmAssessmentInput): ScfAssessmentResult {
  let skor = 0;

  // 1. Bobot Legalitas Badan Usaha (Maks 35 Poin)
  if (input.badanHukum === "PT") {
    skor += 35;
  } else if (input.badanHukum === "CV") {
    skor += 18; // CV dapat menerbitkan sukuk/utang tertentu atau harus migrasi ke PT
  } else {
    skor += 5; // Belum berbadan hukum
  }

  // 2. Bobot Laporan Keuangan (Maks 35 Poin)
  if (input.laporanKeuangan === "audited_2_tahun") {
    skor += 35;
  } else if (input.laporanKeuangan === "internal_2_tahun") {
    skor += 28;
  } else if (input.laporanKeuangan === "internal_1_tahun") {
    skor += 18;
  } else {
    skor += 8;
  }

  // 3. Bobot Usia Operasional Bisnis (Maks 20 Poin)
  if (input.usiaOperasionalTahun >= 3) {
    skor += 20;
  } else if (input.usiaOperasionalTahun >= 2) {
    skor += 16;
  } else if (input.usiaOperasionalTahun >= 1) {
    skor += 10;
  } else {
    skor += 4;
  }

  // 4. Bobot Kesesuaian Target Dana (Maks 10 Poin)
  if (input.targetPendanaan === "500jt_2m" || input.targetPendanaan === "2m_5m") {
    skor += 10; // *Sweet spot* rata-rata penawaran sukses di platform SCF
  } else if (input.targetPendanaan === "bawah_500jt") {
    skor += 7;
  } else {
    skor += 8; // Rp 5M - Rp 10M butuh audit formal yang lebih mendalam
  }

  // Penentuan Tingkat Kesiapan
  let tingkatKesiapan: TingkatKesiapan = "BELUM_SIAP";
  let labelTingkat = "Belum Siap Kurasi";
  let warnaBadge = "bg-rose-50 text-rose-600 border-rose-200";
  let estimasiPersiapan = 12;

  if (skor >= 75) {
    tingkatKesiapan = "SIAP_KURASI";
    labelTingkat = "Siap Kurasi SCF";
    warnaBadge = "bg-emerald-50 text-emerald-600 border-emerald-200";
    estimasiPersiapan = 3;
  } else if (skor >= 50) {
    tingkatKesiapan = "BUTUH_PERBAIKAN";
    labelTingkat = "Butuh Remediasi Berkas";
    warnaBadge = "bg-amber-50 text-amber-600 border-amber-200";
    estimasiPersiapan = 6;
  }

  // Penentuan Rekomendasi Instrumen
  let rekomendasiInstrumen: JenisInstrumen = "SAHAM";
  let labelInstrumen = "Ekuitas / Saham";
  let penjelasanInstrumen =
    "Cocok untuk ekspansi agresif pembukaan cabang baru tanpa kewajiban bagi hasil tetap bulanan.";

  if (
    input.sektor === "manufaktur" ||
    input.sektor === "agrikultur" ||
    input.badanHukum === "CV" ||
    input.targetPendanaan === "500jt_2m"
  ) {
    rekomendasiInstrumen = "SUKUK";
    labelInstrumen = "Sukuk Mudharabah / Ijarah";
    penjelasanInstrumen =
      "Ideal untuk pembiayaan modal kerja atau pengadaan aset dengan skema bagi hasil proporsional tanpa melepas kepemilikan saham.";
  }

  // Checklist Dokumen Dinamis
  const checklistDokumen: DokumenWajibItem[] = [
    {
      id: "doc-1",
      kategori: "LEGALITAS",
      nama: "Akta Pendirian PT & SK Kemenkumham (AHU)",
      wajib: true,
      status: input.badanHukum === "PT" ? "LENGKAP" : "BELUM_DIUNGGAH",
      catatanKorektif:
        input.badanHukum === "PT"
          ? "Telah memenuhi syarat bentuk badan hukum POJK 57/2020."
          : "Wajib melakukan peningkatan badan usaha menjadi PT atau memilih instrumen efek utang/sukuk.",
    },
    {
      id: "doc-2",
      kategori: "LEGALITAS",
      nama: "NIB (Nomor Induk Berusaha) Berbasis Risiko",
      wajib: true,
      status: input.usiaOperasionalTahun >= 1 ? "LENGKAP" : "PERLU_REVISI",
      catatanKorektif:
        "Pastikan kode KBLI pada NIB sesuai dengan kegiatan usaha operasional riil yang diajukan.",
    },
    {
      id: "doc-3",
      kategori: "KEUANGAN",
      nama: "Laporan Keuangan (Neraca & Laba Rugi)",
      wajib: true,
      status:
        input.laporanKeuangan === "audited_2_tahun" ||
        input.laporanKeuangan === "internal_2_tahun"
          ? "LENGKAP"
          : input.laporanKeuangan === "internal_1_tahun"
          ? "PERLU_REVISI"
          : "BELUM_DIUNGGAH",
      catatanKorektif:
        input.laporanKeuangan.startsWith("audited")
          ? "Format laporan siap uji tuntas (due diligence)."
          : "Perlu rekonsiliasi kas dan penambahan catatan atas laporan keuangan (CALK).",
    },
    {
      id: "doc-4",
      kategori: "OPERASIONAL",
      nama: "Rekening Koran Bank Operasional (6 Bulan Terakhir)",
      wajib: true,
      status: input.usiaOperasionalTahun >= 1 ? "LENGKAP" : "BELUM_DIUNGGAH",
      catatanKorektif:
        "Arus kas masuk dan keluar harus mencerminkan omzet pada laporan laba rugi.",
    },
    {
      id: "doc-5",
      kategori: "PROSPEKTUS",
      nama: "Draft Prospektus & Rencana Penggunaan Dana",
      wajib: true,
      status: skor >= 75 ? "PERLU_REVISI" : "BELUM_DIUNGGAH",
      catatanKorektif:
        "Perinci alokasi CAPEX dan OPEX serta estimasi ROI bagi calon pemodal publik.",
    },
  ];

  // Pencocokan Platform Rekomendasi
  const platformRekomendasi = DAFTAR_PLATFORM_SCF.map((platform) => {
    let match = platform.matchScore;
    if (platform.fokusSektor.includes(input.sektor)) match += 3;
    if (platform.instrumen.includes(rekomendasiInstrumen)) match += 2;
    return {
      ...platform,
      matchScore: Math.min(99, match),
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // Poin Kunci Rekomendasi
  const poinKunci: string[] = [];
  if (input.badanHukum !== "PT") {
    poinKunci.push("Prioritaskan konversi status badan usaha ke PT untuk membuka akses emisi saham.");
  } else {
    poinKunci.push("Status badan hukum PT memenuhi kualifikasi emisi efek ekuitas.");
  }

  if (input.laporanKeuangan === "sederhana_kas" || input.laporanKeuangan === "internal_1_tahun") {
    poinKunci.push("Perapian pembukuan standar SAK EMKM diperlukan untuk kurasi due diligence.");
  } else {
    poinKunci.push("Laporan keuangan memenuhi syarat historis penawaran SCF.");
  }

  poinKunci.push(`Peluang kecocokan tertinggi pada platform ${platformRekomendasi[0].nama} (${platformRekomendasi[0].matchScore}% match).`);

  return {
    skorKesiapan: Math.min(100, Math.max(10, skor)),
    tingkatKesiapan,
    labelTingkat,
    warnaBadge,
    rekomendasiInstrumen,
    labelInstrumen,
    penjelasanInstrumen,
    estimasiPersiapanMinggu: estimasiPersiapan,
    checklistDokumen,
    platformRekomendasi,
    poinKunci,
  };
}
