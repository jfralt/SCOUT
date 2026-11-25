# Cerita Pengguna (User Stories) - Landing Page SCOUT

**Fitur:** Landing Page & Pengenalan Platform SCOUT  
**Target Pengguna:** Pemilik UKM, Manajer Keuangan UKM, Calon Penerbit SCF  
**Status:** Spesifikasi Awal (Draf MVP)  

---

## 1. Pemetaan Fakta, Asumsi, dan Rencana

- **Fakta:** Landing page adalah titik kontak pertama calon pengguna UKM untuk memahami apa itu SCOUT, apa itu SCF, dan bagaimana SCOUT membantu mereka.
- **Asumsi:** Pemilik UKM menghabiskan rata-rata waktu kurang dari 60 detik di halaman depan sebelum memutuskan untuk mencoba tombol "Mulai" atau meninggalkan situs.
- **Rencana:** Mengukur metrik *bounce rate*, *scroll depth*, dan rasio klik tombol "Mulai" (*click-through rate / CTR*) menggunakan analitik web.

---

## 2. Rincian User Stories

### US-LP-01: Navigasi Header & Aksi Cepat "Mulai"
- **Sebagai** pengunjung situs (pemilik UKM yang sibuk),
- **Saya ingin** melihat navigasi yang jelas dengan tombol aksi "Mulai" di bagian atas halaman,
- **Sehingga** saya dapat langsung menuju simulasi kesiapan tanpa harus membaca seluruh halaman terlebih dahulu.

**Kriteria Penerimaan (Acceptance Criteria):**
- [x] Logo SCOUT terlihat jelas dengan aksen kuning dan tag penjelas "Pendamping Pendanaan UKM via SCF".
- [x] Tautan navigasi desktop mencakup: *Fitur Utama*, *Cara Kerja*, *Kalkulator Kesiapan*, *FAQ*.
- [x] Tombol "Mulai" berlatar belakang kuning menyala (`#FACC15`) dengan kontras tinggi terhadap header gelap.
- [x] Mengklik tombol "Mulai" di header secara otomatis melakukan *smooth scroll* ke modul interaktif atau asesmen kesiapan.
- [x] Tampilan responsif menyediakan menu *hamburger* yang mudah diakses di ponsel.

---

### US-LP-02: Hero Section & Pemahaman Nilai Produk
- **Sebagai** pemilik UKM yang membutuhkan modal usaha,
- **Saya ingin** memahami dalam satu kalimat judul apa manfaat SCOUT bagi bisnis saya,
- **Sehingga** saya yakin bahwa platform ini tepat untuk membantu persiapan pendanaan saya.

**Kriteria Penerimaan (Acceptance Criteria):**
- [x] Judul utama memuat proposisi nilai tegas: *"Akselerasi Penggalangan Dana UKM Melalui Securities Crowdfunding"*.
- [x] Subjudul menjelaskan secara padat peran SCOUT dalam melacak dokumen, menilai kelayakan, dan mencocokkan platform SCF resmi OJK.
- [x] Terdapat tombol CTA primer *"Mulai Konsultasi Kesiapan"* dan tombol sekunder *"Pelajari Cara Kerja"*.
- [x] Menampilkan kartu visual mockup dasbor SCOUT dengan indikator skor kesiapan (*Readiness Score*) dan grafik progres.
- [x] Memuat bukti kepercayaan (*trust badges*): Kepatuhan POJK 57/2020, 100% Data Aman, dan Tanpa Biaya Tersembunyi.

---

### US-LP-03: Pameran Tiga Fitur Utama (Core Features Showcase)
- **Sebagai** manajer keuangan UKM,
- **Saya ingin** melihat penjelasan rinci mengenai 3 pilar solusi SCOUT,
- **Sehingga** saya tahu alat apa saja yang akan saya dapatkan untuk mempermudah pekerjaan persiapan berkas.

**Kriteria Penerimaan (Acceptance Criteria):**
- [x] **Document Tracking:** Menjelaskan fitur pelacakan kelengkapan berkas legal, keuangan, dan bisnis dengan indikator status terpusat.
- [x] **Document Assessment:** Menjelaskan sistem diagnosa skor kesiapan dokumen (0 - 100) dan rekomendasi perbaikan sebelum diserahkan ke kurator SCF.
- [x] **Platform Matchmaking:** Menjelaskan fitur algoritma pencocokan profil UKM dengan platform SCF berizin OJK yang paling sesuai instrumennya (saham vs sukuk).
- [x] Setiap kartu fitur menggunakan ikon visual aksen kuning dengan teks penjelasan berbahasa Indonesia yang lugas.

---

### US-LP-04: Simulasi Mandiri Kesiapan Awal (Interactive Readiness Estimator)
- **Sebagai** calon penerbit SCF,
- **Saya ingin** memasukkan parameter bisnis saya (badan usaha, lama beroperasi, omzet, target dana) ke dalam kalkulator interaktif di landing page,
- **Sehingga** saya mendapat gambaran awal tingkat kesiapan dokumen dan estimasi peluang penggalangan dana.

**Kriteria Penerimaan (Acceptance Criteria):**
- [x] Input interaktif mencakup: Bentuk badan usaha (PT / CV / Lainnya), Lama usaha berjalan, Target nominal pendanaan, dan Ketersediaan laporan keuangan.
- [x] Kalkulator menghitung estimasi kesiapan awal dan memberikan ringkasan status instan (contoh: *Perlu Penyesuaian Badan Usaha ke PT*).
- [x] Pengguna dapat menyalin (*copy summary*) atau menyimpan hasil simulasi kesiapan mereka.

---

### US-LP-05: Alur 3 Langkah Mudah (How It Works)
- **Sebagai** pengguna baru yang belum paham alur SCF,
- **Saya ingin** melihat tahapan proses kerja SCOUT yang sederhana,
- **Sehingga** saya tidak merasa terbebani atau bingung memulai langkah pertama.

**Kriteria Penerimaan (Acceptance Criteria):**
- [x] Menampilkan 3 langkah: (1) Unggah & Lacak Dokumen, (2) Dapatkan Skor & Rekomendasi Asesmen, (3) Cocokkan & Ajukan ke Platform SCF Mitra.
- [x] Setiap langkah diberi nomor urut tipografi monospaced bernuansa emas dengan penjelasan ringkas.

---

### US-LP-06: Tanya Jawab Seputar SCF (FAQ Section)
- **Sebagai** pemilik UKM yang skeptis terhadap pendanaan publik,
- **Saya ingin** membaca jawaban atas pertanyaan-pertanyaan umum seputar legalitas, biaya, dan kerahasiaan data,
- **Sehingga** keraguan dan kekhawatiran saya terjawab sebelum mendaftar.

**Kriteria Penerimaan (Acceptance Criteria):**
- [x] Pertanyaan mencakup: Legalitas SCOUT, perbedaan SCOUT dengan penyelenggara SCF, keamanan data laporan keuangan, dan syarat minimal badan hukum.
- [x] Antarmuka akordeon interaktif yang bisa dibuka-tutup dengan mulus.

---

### US-LP-07: Banner Ajakan Penutup (CTA Section)
- **Sebagai** pengunjung yang telah menggulir sampai ke bawah halaman,
- **Saya ingin** melihat ajakan bertindak terakhir yang menonjol,
- **Sehingga** saya terdorong mengambil langkah awal untuk memeriksa kesiapan bisnis saya.

**Kriteria Penerimaan (Acceptance Criteria):**
- [x] Memuat tombol kuning besar *"Mulai Sekarang"* yang kontras terhadap latar belakang hitam pekat.
- [x] Teks penegas: *"Gratis Konsultasi Awal • Data Terenkripsi • Terhubung Ekosistem SCF Berizin"*.

