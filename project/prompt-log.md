# PROMPT LOG SCOUT

## Entri 1. Rebranding Aplikasi menjadi SCOUT

**Tanggal:** 11 November 2026

**Prompt:**

Melakukan perombakan identitas aplikasi dari Simpanku menjadi SCOUT. Mengubah seluruh nama, teks, konten, dan elemen UI agar mencerminkan SCOUT sebagai platform pendamping UKM untuk penggalangan dana melalui Securities Crowdfunding (SCF).

Fitur utama:
- Document Tracking.
- Document Assessment.
- Platform Matchmaking.

Menggunakan identitas visual:
- Primary Blue: #5170FF.
- Black: #000000.
- White: #FFFFFF.

**Hasil:**

Agent memeriksa proyek dan menemukan bahwa aplikasi masih menggunakan identitas Simpanku/Tabungin, termasuk konten simulasi tabungan dan palet warna hitam-kuning.

**Catatan:**

Diperlukan perombakan menyeluruh agar identitas produk SCOUT konsisten.

---

## Entri 2. Audit Struktur Proyek dan Identitas Visual

**Tanggal:** 11 November 2026

**Prompt:**

Meminta Agent memeriksa struktur proyek, dokumentasi, komponen, dan file yang berkaitan dengan branding SCOUT.

Instruksi:
- Memeriksa AGENTS.md dan dokumentasi product/.
- Memeriksa seluruh halaman dan komponen.
- Memastikan logo SCOUT tersedia.
- Memperbarui brand guideline.
- Mempertahankan struktur modular modules/ dan product/.
- Tidak membuat ulang proyek dari awal.

**Hasil:**

Agent menemukan bahwa logo resmi SCOUT belum tersedia di folder public/. Agent juga mengidentifikasi file dan komponen yang perlu diperbarui.

**Catatan:**

Logo resmi perlu dimasukkan ke folder public/ sebelum digunakan sebagai identitas utama aplikasi.

---

## Entri 3. Perencanaan Complete UI/UX Redesign

**Tanggal:** 11 November 2026

**Prompt:**

Meminta Agent menyusun rencana perombakan UI secara menyeluruh, meliputi:
- Pembaruan desain sistem dan palet warna global.
- Perombakan Navbar dan Footer.
- Perombakan seluruh komponen landing page.
- Transformasi kalkulator tabungan menjadi SCF Readiness Estimator.
- Pembersihan kode lama.
- Pembaruan dokumentasi teknis.
- Pengujian kompilasi dan verifikasi build.

Agent harus memberikan rencana terlebih dahulu dan menunggu persetujuan sebelum mengubah kode.

**Hasil:**

Agent memberikan rencana pengerjaan dalam enam tahap, termasuk daftar file yang menjadi target perubahan.

**Catatan:**

Persetujuan diberikan setelah rencana pengerjaan diperiksa.

---

## Entri 4. Pembersihan Kode Lama Simpanku

**Tanggal:** 11 November 2026

**Prompt:**

Meminta Agent melakukan audit dan cleanup codebase untuk menghilangkan seluruh referensi Simpanku yang masih tersisa.

Pemeriksaan mencakup:
- Nama aplikasi.
- Komponen.
- Variabel dan fungsi.
- Dummy data.
- Teks dan konten.
- Styling.
- Konfigurasi.
- Logo dan ikon.

Kode lama yang tidak relevan harus dihapus atau di-refactor tanpa merusak konfigurasi Next.js dan fitur SCOUT yang masih dibutuhkan.

**Hasil:**

Agent menerima instruksi untuk melakukan audit dan cleanup sebagai bagian dari proses redesign.

**Catatan:**

Pastikan tidak ada referensi Simpanku yang tertinggal dalam aplikasi maupun source code, kecuali dokumentasi historis yang diperlukan.

---

## Entri 5. Redesign UI/UX SCOUT sebagai Fintech SaaS

**Tanggal:** 11 November 2026

**Prompt:**

Meminta Agent melakukan COMPLETE UI/UX REDESIGN agar SCOUT memiliki tampilan profesional, modern, minimalis, dan premium seperti produk fintech SaaS.

Ketentuan:
- Menggunakan warna brand SCOUT.
- Merancang ulang navigation bar, sidebar, dashboard, landing page, cards, tables, forms, dan komponen lainnya.
- Menampilkan informasi dashboard seperti readiness score, document completion progress, assessment status, dan rekomendasi platform SCF.
- Menggunakan dummy data yang realistis.
- Mempertahankan struktur modular.
- Memastikan seluruh halaman responsive.
- Menghindari penambahan library tanpa alasan.
- Memastikan tidak ada error TypeScript maupun build.

**Hasil:**

Agent menerima instruksi redesign menyeluruh dengan enam tahapan pengerjaan, mulai dari audit codebase hingga pengujian akhir.

**Catatan:**

Target akhir adalah menghasilkan aplikasi yang benar-benar mencerminkan SCOUT, bukan sekadar aplikasi Simpanku yang berganti nama dan warna.