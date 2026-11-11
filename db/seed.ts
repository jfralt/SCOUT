import { GoalCategory } from "./schema";

/**
 * Data awal (Seed) untuk kategori impian tabungan
 */
export const SEED_GOAL_CATEGORIES: GoalCategory[] = [
  {
    id: "darurat",
    name: "Dana Darurat",
    icon: "🛡️",
    defaultTarget: 30000000,
    defaultMonths: 12,
    defaultAnnualRate: 4.5,
    createdAt: new Date("2026-01-01T00:00:00Z"),
  },
  {
    id: "rumah",
    name: "DP Rumah Impian",
    icon: "🏠",
    defaultTarget: 120000000,
    defaultMonths: 36,
    defaultAnnualRate: 6.0,
    createdAt: new Date("2026-01-01T00:00:00Z"),
  },
  {
    id: "kendaraan",
    name: "Beli Kendaraan",
    icon: "🚗",
    defaultTarget: 45000000,
    defaultMonths: 18,
    defaultAnnualRate: 5.0,
    createdAt: new Date("2026-01-01T00:00:00Z"),
  },
  {
    id: "liburan",
    name: "Liburan Impian",
    icon: "✈️",
    defaultTarget: 20000000,
    defaultMonths: 10,
    defaultAnnualRate: 4.0,
    createdAt: new Date("2026-01-01T00:00:00Z"),
  },
  {
    id: "nikah",
    name: "Biaya Menikah",
    icon: "💍",
    defaultTarget: 75000000,
    defaultMonths: 24,
    defaultAnnualRate: 5.5,
    createdAt: new Date("2026-01-01T00:00:00Z"),
  },
  {
    id: "usaha",
    name: "Modal Usaha",
    icon: "💼",
    defaultTarget: 50000000,
    defaultMonths: 20,
    defaultAnnualRate: 7.0,
    createdAt: new Date("2026-01-01T00:00:00Z"),
  },
];

/**
 * Fungsi seeder opsional saat dihubungkan ke ORM / Database
 */
export async function runSeed() {
  console.log("🌱 Menjalankan seed data kategori tabungan...");
  console.log(`Berhasil memuat ${SEED_GOAL_CATEGORIES.length} kategori.`);
  return SEED_GOAL_CATEGORIES;
}

