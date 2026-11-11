# Catatan Perubahan (project/changelog.md)

## [2026-11-11] - Restrukturisasi Modular & Landing Page Simulasi Tabungan

### Ditambahkan
- Modul `modules/savings/`:
  - Komponen kalkulator simulasi bunga majemuk (`SavingsCalculator.tsx`).
  - Bagian `Hero.tsx` dengan tombol "Mulai" dan kartu visual status tabungan.
  - Bagian pendukung: `Features.tsx`, `HowItWorks.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `CTASection.tsx`.
  - Agregator `LandingPage.tsx`.
  - Logika perhitungan matematis di `calculator.ts` dan tipe data di `types/index.ts`.
- Modul `shared/`:
  - `Navbar.tsx` dengan navigasi responsif dan tombol aksi "Mulai".
  - `Footer.tsx` informasi instrumen finansial.
  - Utility `formatters.ts` (`formatRupiah`).
- Modul `product/`:
  - Dokumen ringkasan produk `overview.md`.
  - Spesifikasi fitur `simulasi-tabungan.md`.
  - Rencana rilis `roadmap.md`.
- Modul `db/`:
  - Skema data `schema.ts`.
  - Data bawaan `seed.ts`.
  - Petunjuk integrasi ORM `README.md`.
- Modul `project/`:
  - Catatan arsitektur `architecture.md`.
  - Rekaman keputusan teknis `decisions.md`.
  - Log perubahan `changelog.md`.
- Panduan Asisten AI di `AGENTS.md`.

### Diubah
- Mengubah `app/page.tsx` menjadi rute tipis yang mendelegasikan tampilan ke `LandingPage`.
- Mengatur konfigurasi `globals.css` dengan tema gelap hitam & kuning emas.
- Menghapus komponen yang sebelumnya ditaruh langsung di dalam `app/components/`.

