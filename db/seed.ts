/**
 * Data Awal (Seed) Platform Penyelenggara SCF Mitra Berizin OJK
 */

export const SEED_SCF_PLATFORMS = [
  {
    id: "bizhare",
    nama: "Bizhare",
    izinOjkNomor: "KEP-71/D.04/2019",
    fokusSektor: ["fnb", "ritel", "jasa", "kesehatan"],
    instrumen: ["SAHAM", "SUKUK"],
    rentangDanaMin: 500000000,
    rentangDanaMax: 10000000000,
    isAktif: true,
  },
  {
    id: "santara",
    nama: "Santara",
    izinOjkNomor: "KEP-59/D.04/2019",
    fokusSektor: ["fnb", "agrikultur", "manufaktur", "ritel"],
    instrumen: ["SAHAM"],
    rentangDanaMin: 1000000000,
    rentangDanaMax: 10000000000,
    isAktif: true,
  },
  {
    id: "shafiq",
    nama: "Shafiq",
    izinOjkNomor: "KEP-37/D.04/2021",
    fokusSektor: ["agrikultur", "manufaktur", "jasa", "kesehatan", "fnb"],
    instrumen: ["SUKUK"],
    rentangDanaMin: 1000000000,
    rentangDanaMax: 10000000000,
    isAktif: true,
  },
  {
    id: "landx",
    nama: "LBS Urun Dana (LandX)",
    izinOjkNomor: "KEP-77/D.04/2019",
    fokusSektor: ["ritel", "manufaktur", "jasa", "fnb"],
    instrumen: ["SAHAM", "SUKUK"],
    rentangDanaMin: 1000000000,
    rentangDanaMax: 10000000000,
    isAktif: true,
  },
];

export async function runSeed() {
  console.log("🌱 Menjalankan seed data platform SCF berizin OJK...");
  console.log(`✓ Berhasil memuat ${SEED_SCF_PLATFORMS.length} platform SCF mitra.`);
}
