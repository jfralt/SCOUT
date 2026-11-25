# Catatan Arsitektur Sistem (project/architecture.md)

## 1. Prinsip Utama: *Thin Routes, Modular Features*
Proyek ini mengadopsi pola arsitektur berbasis fitur (*feature-driven architecture*):
- **`app/`**: Hanya menangani rute, layout, dan metadata (*thin routes*). Tidak memuat logika bisnis rumit atau state kalkulator secara langsung.
- **`modules/`**: Menyimpan seluruh kode implementasi per fitur (`modules/savings`), mencakup antarmuka komponen, tipe data, dan logika perhitungan.
- **`shared/`**: Komponen, utility, dan pemformat yang digunakan di lebih dari satu fitur (seperti `Navbar`, `Footer`, `formatRupiah`).
- **`db/`**: Skema data dan *seed data* yang independen dari tampilan.
- **`product/`**: Dokumentasi spesifikasi produk dan rencana fitur.
- **`project/`**: Rekaman proses, keputusan teknis (*ADRs*), dan log pengembangan.

## 2. Alur Data (Data Flow)
```
[User Browser]
      │
      ▼
  app/page.tsx (Tipis - Penyedia Layout)
      │
      ▼
  modules/savings/components/LandingPage.tsx
      │
      ├──> Hero.tsx (CTA Button "Mulai" -> scroll to id="kalkulator")
      │
      ├──> SavingsCalculator.tsx (State: Target, Saldo Awal, Bulan, Bunga)
      │         │
      │         ▼
      │    modules/savings/utils/calculator.ts (Formula Compound Interest)
      │         │
      │         ▼
      │    shared/utils/formatters.ts (Format Mata Uang Rupiah)
      │
      └──> Features.tsx, HowItWorks.tsx, Testimonials.tsx, FAQ.tsx, CTASection.tsx
```

