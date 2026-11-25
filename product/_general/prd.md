# Product Requirement Document (PRD) - SCOUT

**Nama Produk:** SCOUT  
**Deskripsi Singkat:** Platform pendamping dan akselerator UKM untuk persiapan penggalangan dana melalui skema *Securities Crowdfunding* (SCF) di Indonesia.  
**Versi Dokumen:** 1.0  
**Tanggal:** 11 November 2026  
**Status:** Draf Pengembangan Awal (Tahap Desain & Spesifikasi)

---

## 1. Latar Belakang & Pemisahan Konteks

> [!IMPORTANT]
> Sesuai prinsip integritas produk, bagian ini membedakan secara tegas antara **Fakta**, **Asumsi**, dan **Rencana**.

### 1.1. Fakta (Regulasi & Industri Riil)
1. **Regulasi OJK:** Penyelenggaraan *Securities Crowdfunding* diatur dalam POJK Nomor 57/POJK.04/2020 (dan perubahannya POJK Nomor 16/POJK.04/2021). SCF mengizinkan UKM berbadan hukum (PT atau badan usaha lainnya yang diakui) menerbitkan efek berupa ekuitas (saham), efek utang (obligasi), atau sukuk dengan nilai penawaran maksimal Rp 10 miliar per 12 bulan.
2. **Kriteria Seleksi Penyelenggara SCF:** Platform penyelenggara SCF berizin OJK (seperti Santara, Bizhare, LandX, Shafiq, Danasaham, dll.) memiliki tahapan kurasi dan *due diligence* internal yang ketat, meliputi legalitas perizinan usaha (NIB, AHU PT), laporan keuangan historis (minimal 1-2 tahun), proyeksi arus kas, dan prospektus bisnis.
3. **Legalitas Bukan Penyelenggara:** SCOUT beroperasi sebagai platform teknologi pendamping persiapan (*enabler/pre-due diligence advisory tool*), **bukan** sebagai penyelenggara SCF atau pengelola dana pemodal.

### 1.2. Asumsi (Hipotesis Kebutuhan Pengguna)
1. **Asumsi Hambatan UKM:** Sebagian besar pemilik UKM memiliki bisnis yang menguntungkan namun tidak memiliki staf legal dan akuntan khusus, sehingga merasa terintimidasi oleh kompleksitas dokumen SCF (misal: penyusunan prospektus, restrukturisasi laporan laba rugi, dan rasio solvabilitas).
2. **Asumsi Tingkat Keguguran Dokumen:** Diasumsikan lebih dari 65% aplikasi UKM ke platform SCF ditolak atau mengalami keterlambatan verifikasi karena dokumen tidak lengkap, tidak terstandarisasi, atau format laporan keuangan tidak siap diaudit.
3. **Asumsi Kebutuhan Matchmaking:** Diasumsikan pemilik UKM kebingungan menentukan apakah bisnis mereka lebih cocok menerbitkan saham atau sukuk/obligasi, serta platform SCF mana yang memiliki rekam jejak sukses di sektor industri mereka (contoh: F&B vs Manufaktur vs Properti).

### 1.3. Rencana (Validasi & Eksperimen)
1. Mengadakan riset kualitatif dan wawancara terstruktur kepada 15-20 pemilik UKM yang pernah mencoba atau berminat mengajukan SCF untuk memvalidasi asumsi hambatan di atas.
2. Berkolaborasi secara non-resmi/studi banding dengan penyelenggara SCF untuk memetakan parameter *checklist* kurasi dokumen standar industri.
3. Meluncurkan landing page dan modul penilaian mandiri (*self-assessment score*) sebagai instrumen uji coba minat pasar (*market validation*).

---

## 2. Tujuan Produk & Sasaran (Goals & Objectives)

### 2.1. Tujuan Utama
- Menjadi *single source of truth* bagi UKM dalam mempersiapkan, melacak, dan memvalidasi seluruh berkas persyaratan sebelum diajukan ke platform penyelenggara SCF.
- Mempercepat waktu persiapan pengajuan (*time-to-apply*) UKM dari rata-rata beberapa bulan menjadi hitungan minggu.
- Meningkatkan rasio penerimaan (*acceptance rate*) berkas UKM di platform penyelenggara SCF.

### 2.2. Indikator Keberhasilan (Target Metrics - Rencana)
- **Tingkat Kesiapan Dokumen:** $\ge 85\%$ pengguna yang mengikuti rekomendasi perbaikan SCOUT memperoleh status "Siap Kurasi".
- **Waktu Penyelesaian Dokumen:** Penurunan durasi pengumpulan dan perapian berkas hingga $40\%$.
- **Tingkat Kepuasan Pengguna:** Skor CSAT minimal 4.2 dari 5 pada modul penilaian kesiapan.

---

## 3. Fitur Utama Produk (Core Features)

SCOUT berfokus pada 3 pilar fitur utama:

### 3.1. Fitur 1: Document Tracking
*Sistem pelacakan dan manajemen dokumen administratif SCF terpadu.*
- **Dasbor Kelengkapan:** Indikator visual progres berkas (Persentase kelengkapan: Legalitas, Keuangan, Operasional, Bisnis).
- **Status Dokumen Berjenjang:** Label status per berkas: *Belum Diunggah*, *Sedang Ditinjau*, *Perlu Revisi*, *Lengkap & Valid*.
- **Catatan & Versi Berkas (*Versioning*):** Menyimpan riwayat pembaruan berkas sehingga pengurus UKM dapat melihat catatan perbaikan tanpa kehilangan arsip lama.
- **Pengingat Tenggat Waktu:** Notifikasi untuk dokumen yang memiliki masa berlaku terbatas (misal: SPT Tahunan, rekening koran 3 bulan terakhir).

### 3.2. Fitur 2: Document Assessment
*Mesin evaluasi dan diagnosa kesiapan dokumen berbasis standar kurasi SCF.*
- **Checklist Kepatuhan Regulasi:** Evaluasi otomatis dan semi-manual terhadap keberadaan elemen wajib (Akta Pendirian PT, NIB RBA, NPWP Badan, Laporan Laba Rugi, Neraca, Prospektus).
- **Skor Kesiapan SCF (*SCF Readiness Score*):** Nilai komprehensif skala 0 - 100 yang memetakan kesiapan dokumen ke dalam level:
  - *Merah (0 - 49):* Belum Siap (Fondasi legal/keuangan belum lengkap).
  - *Kuning (50 - 74):* Butuh Perbaikan (Dokumen inti ada, butuh perapian format/catatan penjelasan).
  - *Hijau (75 - 100):* Siap Diajukan ke Platform SCF.
- **Rekomendasi Tindakan Korektif:** Daftar panduan konkret perbaikan (misal: "Tambahkan catatan atas laporan keuangan mengenai piutang usaha", "Format neraca belum seimbang").

### 3.3. Fitur 3: Platform Matchmaking
*Sistem pencocokan profil UKM dengan platform penyelenggara SCF yang paling relevan.*
- **Pencocokan Berbasis Kriteria Usaha:**
  - Jenis instrumen penawaran: Ekuitas Saham vs Efek Utang / Obligasi vs Sukuk Syariah.
  - Sektor industri: Kuliner/F&B, Agrikultur, Ritel, Jasa Kreatif, Properti, dll.
  - Target nominal pendanaan: Rentang < Rp 500 Juta, Rp 500 Juta - Rp 2 Miliar, atau Rp 2 Miliar - Rp 10 Miliar.
- **Katalog Profil Platform SCF Berizin:** Informasi transparan mengenai karakteristik masing-masing platform, portofolio proyek yang berhasil didanai, dan preferensi instrumen.
- **Rekomendasi Terarah:** Rekomendasi 2-3 platform terbaik dengan persentase kecocokan (*match rate*) disertai alasan objektif.

---

## 4. Ruang Lingkup Produk (Product Scope)

### 4.1. Masuk dalam Ruang Lingkup (In-Scope - Rencana MVP)
- Landing page publik bertema Kuning & Hitam dengan tombol aksi "Mulai" / "Cek Kesiapan".
- Modul simulasi interaktif kelayakan awal (*preliminary readiness check*) di landing page.
- Dasbor pelacak dokumen (*Document Tracking*) untuk kategori Legalitas & Keuangan.
- Sistem penilaian skor kesiapan (*Document Assessment Score*).
- Direktori dan simulasi pencocokan platform (*Platform Matchmaking*).

### 4.2. Di Luar Ruang Lingkup (Out-of-Scope - Rencana Batasan Tegas)
- SCOUT **tidak** melakukan penghimpunan dana langsung dari pemodal.
- SCOUT **tidak** menerbitkan efek atau saham.
- SCOUT **tidak** menjamin 100% penerimaan pendanaan di platform SCF (keputusan final tetap berada pada komite investasi masing-masing penyelenggara SCF).
- SCOUT **bukan** kantor akuntan publik (KAP) resmi; audit formal tetap dilakukan oleh auditor independen jika disyaratkan oleh platform.

---

## 5. Rencana Fase Rilis (Release Phases)

1. **Fase 1 (MVP - Saat Ini):**
   - Landing page responsif, pengenalan platform SCOUT, panduan edukasi SCF, dan kalkulator simulasi kesiapan awal.
2. **Fase 2 (Alpha Testing):**
   - Sistem login pengguna UKM, pengunggahan berkas, kalkulator otomatis skor kesiapan dokumen, dan filter matchmaking platform.
3. **Fase 3 (Beta & Kolaborasi):**
   - Integrasi kemitraan rujukan dengan platform SCF berizin OJK, notifikasi pembaruan kurasi, dan pendampingan ahli secara berkala.

