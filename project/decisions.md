# Architectural Decision Records (ADR)

## ADR-001: Tema Warna Hitam dan Kuning (Black & Yellow Gold)
- **Status:** Diterima & Diimplementasikan.
- **Konteks:** Aplikasi bertema finansial modern memerlukan kesan premium, percaya diri, dan menarik bagi demografi muda.
- **Keputusan:** Menggunakan palet dasar hitam pekat (`#000000`, `zinc-950`) dengan aksen kuning emas menyala (`yellow-400`, `amber-500`) dan efek glow halus.
- **Dampak:** Kontras tinggi, teks sangat mudah dibaca, dan tombol CTA "Mulai" sangat mencolok.

## ADR-002: Struktur Folder Berbasis Fitur (Feature Modules)
- **Status:** Diterima & Diimplementasikan.
- **Konteks:** Memastikan rute Next.js tetap bersih (*thin routes*) dan kode per fitur terisolasi dengan rapi.
- **Keputusan:** Memisahkan struktur menjadi `app/`, `modules/`, `shared/`, `product/`, `db/`, `project/`, dan `AGENTS.md`.
- **Dampak:** Kemudahan *refactoring*, kemudahan pengujian komponen independen, dan batas kode yang jelas bagi pengembang maupun asisten AI.

## ADR-003: Model Perhitungan Bunga Majemuk Bulanan (*Monthly Compounding Annuity*)
- **Status:** Diterima & Diimplementasikan.
- **Konteks:** Tabungan dengan instrumen imbal hasil (deposito/reksadana) menghitung return secara periodik bulanan.
- **Keputusan:** Menggunakan formula anuitas nilai masa depan (*future value of an ordinary annuity*) digabung pertumbuhan saldo awal.
- **Dampak:** Hasil simulasi lebih realistis dan mencerminkan potensi pertumbuhan modal pengguna.

