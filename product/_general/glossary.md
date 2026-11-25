# Glosarium Istilah Proyek (Glossary) - SCOUT

Dokumen ini memuat definisi istilah baku industri *Securities Crowdfunding* (SCF), regulasi OJK, dan istilah internal fitur platform SCOUT.

---

## 1. Pemisahan Fakta, Asumsi, dan Rencana Terminologi

- **Fakta:** Istilah regulasi (POJK, Penerbit, Pemodal, Penyelenggara) merujuk langsung pada definisi resmi Otoritas Jasa Keuangan (OJK).
- **Asumsi:** Banyak istilah pasar modal yang asing bagi pemilik UKM (misal: *Dilusi Saham*, *Sukuk Mudharabah*, *Earning Before Interest and Taxes / EBIT*), sehingga membutuhkan terjemahan istilah yang lebih membumi di antarmuka SCOUT.
- **Rencana:** Menyediakan fitur *interactive tooltip* atau glosarium cepat pada setiap form pengisian dokumen di platform SCOUT.

---

## 2. Istilah Regulasi & Ekosistem SCF

| Istilah | Kategori | Definisi & Konteks |
|---|---|---|
| **SCF (Securities Crowdfunding)** | Regulasi / OJK | Layanan urun dana melalui penawaran efek berbasis teknologi informasi yang mempertemukan Penerbit (UKM) dan Pemodal secara langsung melalui platform internet berizin OJK (POJK No. 57/POJK.04/2020). |
| **Penerbit (*Issuer*)** | Regulasi / OJK | Badan usaha berbentuk perseroan terbatas (PT) atau badan usaha lainnya di Indonesia yang menerbitkan efek melalui platform SCF untuk menghimpun modal. |
| **Penyelenggara SCF** | Regulasi / OJK | Badan hukum Indonesia yang berizin resmi dari OJK untuk mengoperasikan platform penawaran efek SCF (contoh: Bizhare, Santara, LandX, Shafiq, dll.). |
| **Pemodal (*Investor*)** | Regulasi / OJK | Pihak perorangan atau korporasi yang membeli efek yang ditawarkan oleh Penerbit melalui Penyelenggara SCF. |
| **Prospektus SCF** | Finansial / Legal | Dokumen resmi komprehensif yang memuat profil perusahaan, latar belakang pendiri, model bisnis, laporan keuangan, risiko usaha, dan rencana penggunaan dana penawaran. |
| **Ekuitas (Saham)** | Instrumen Efek | Bukti kepemilikan modal pada sebuah perseroan terbatas. Pemodal mendapatkan dividen dari keuntungan usaha dan hak apresiasi nilai saham. |
| **Efek Bersifat Utang (Obligasi)** | Instrumen Efek | Surat berharga pengakuan utang di mana Penerbit berkomitmen membayar kembali pokok utang beserta kupon/bunga dalam jangka waktu tertentu. |
| **Sukuk** | Instrumen Efek | Efek syariah berupa sertifikat atau bukti kepemilikan bernilai sama yang mewakili bagian kepemilikan aset atau proyek usaha tanpa unsur riba/bunga. |
| **KSEI (Kustodian Sentral Efek Indonesia)** | Regulasi | Lembaga penyimpanan dan penyelesaian transaksi efek di pasar modal Indonesia yang mencatatkan efek SCF secara terpusat. |
| **Due Diligence** | Proses Kurasi | Uji tuntas atau proses verifikasi menyeluruh terhadap aspek legal, keuangan, dan rekam jejak operasional UKM oleh tim kurator SCF. |

---

## 3. Istilah Internal Fitur SCOUT

| Istilah | Fitur Terkait | Definisi & Peran di SCOUT |
|---|---|---|
| **SCOUT** | Produk | Platform teknologi pendamping (*readiness enabler*) untuk membantu UKM mempersiapkan, menilai, dan mencocokkan dokumen pengajuan pendanaan SCF. |
| **Document Tracking** | Fitur 1 | Modul pemantauan siklus hidup berkas administratif UKM, mencakup status unggah, riwayat revisi, kelengkapan per kategori, dan peringatan masa berlaku. |
| **Document Assessment** | Fitur 2 | Modul diagnostik otomatis dan terpandu yang mengevaluasi format, rasio finansial, dan kelengkapan klausul hukum dokumen UKM terhadap standar kurasi SCF. |
| **SCF Readiness Score** | Fitur 2 | Nilai indeks kesiapan (skala 0 - 100) yang dihasilkan oleh algoritma asesmen SCOUT untuk mengukur probabilitas kelayakan berkas UKM. |
| **Platform Matchmaking** | Fitur 3 | Sistem algoritma rekomendasi yang menganalisis profil UKM (industri, nominal target, instrumen) dan menyodorkan platform penyelenggara SCF yang paling relevan. |
| **Readiness Level** | Fitur 2 | Klasifikasi tiga warna kesiapan berkas: Merah (Belum Siap), Kuning (Butuh Perbaikan), dan Hijau (Siap Diajukan). |
| **Pre-Submission Checklist** | Fitur 1 & 2 | Daftar periksa terstandarisasi yang harus dipenuhi UKM sebelum berkas diekspor dan diajukan ke portal penyelenggara SCF. |
| **Thin Routes** | Arsitektur Teknis | Pola koding di mana berkas rute `app/page.tsx` dibuat seringkas mungkin dan seluruh logika didelegasikan ke `modules/`. |

