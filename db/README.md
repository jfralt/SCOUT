# Modul Database (db/)

Direktori ini memuat definisi skema data dan seed awal untuk proyek Tabungin.

## Berkas
- `schema.ts`: Definisi antarmuka TypeScript untuk entitas data (`GoalCategory`, `UserSavingsPlan`, `SimulationLog`).
- `seed.ts`: Kumpulan data bawaan (*preset*) untuk kategori tabungan yang disesuaikan dengan kebutuhan pasar Indonesia.

## Panduan Migrasi
Jika proyek akan dihubungkan ke ORM seperti Prisma atau Drizzle:
1. Skema di `schema.ts` dapat langsung dikonversi menjadi file `schema.prisma` atau `schema.ts` (Drizzle).
2. Fungsi `runSeed()` pada `seed.ts` dapat dieksekusi melalui skrip `npm run db:seed`.

