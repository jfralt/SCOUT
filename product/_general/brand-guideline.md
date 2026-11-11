# Panduan Identitas Merek (Brand Guideline) - SCOUT

**Platform:** SCOUT - Pendamping Pendanaan UKM via Securities Crowdfunding  
**Versi:** 1.0  
**Tanggal Pembaruan:** 11 November 2026  

---

## 1. Filosofi & Esensi Merek

### 1.1. Arti Nama "SCOUT"
Kata **SCOUT** (Pemandu / Pramuka) melambangkan peran sebagai penunjuk jalan yang andal, sigap, dan berpengetahuan luas. SCOUT memandu para pelaku UKM Indonesia menavigasi jalur birokrasi, kelayakan finansial, dan audit hukum menuju gerbang pendanaan publik melalui *Securities Crowdfunding* (SCF).

### 1.2. Pemisahan Fakta, Asumsi, dan Rencana
- **Fakta:** Dunia pasar modal dan *fintech* pendanaan sering dipersepsikan kaku, rumit, dan penuh jargon teknis oleh masyarakat UKM.
- **Asumsi:** Identitas visual modern bernuansa *Fintech Gold & Bold Black* memberikan kesan kredibilitas tinggi, prestise, sekaligus energi optimisme bagi pertumbuhan bisnis.
- **Rencana:** Menjalankan pengujian preferensi visual (*A/B testing visual perception*) pada landing page untuk mengukur dampak kombinasi warna terhadap tingkat konversi tombol CTA.

---

## 2. Palet Warna (Color Palette)

Identitas visual SCOUT menggunakan perpaduan tegas antara **Kuning Emas (Gold Yellow)** dan **Hitam Pekat (Obsidian Black)** dengan kontras tinggi standar WCAG 2.1 AA.

### 2.1. Warna Primer
| Peran | Hex Code | Tailwind Token | Penggunaan |
|---|---|---|---|
| **Scout Gold (Accent)** | `#FACC15` | `yellow-400` | Tombol CTA utama ("Mulai"), aksen badge, indikator skor tinggi, highlight teks penting |
| **Scout Amber (Glow)** | `#EAB308` | `amber-500` | Efek hover, gradien tombol, batas aktif (*border focus*) |
| **Obsidian Black (Canvas)** | `#050505` | `black` | Latar belakang utama aplikasi dan landing page |
| **Deep Charcoal (Surface)** | `#0F0F11` | `zinc-950` | Latar kartu (*cards*), container section, header sticky |
| **Zinc Border (Border)** | `#27272A` | `zinc-800` | Garis pemisah komponen, kartu modul, input border |

### 2.2. Warna Status Dokumen & Diagnosa (Semantic Colors)
| Status | Hex Code | Makna pada Fitur SCOUT |
|---|---|---|
| **Lolos / Siap (Green)** | `#10B981` | Skor $\ge 75$, dokumen lengkap dan valid diverifikasi |
| **Perlu Revisi (Amber)** | `#F59E0B` | Skor 50-74, dokumen perlu penyesuaian format atau catatan |
| **Kritis / Belum Ada (Red)** | `#EF4444` | Skor $< 50$, dokumen wajib belum diunggah atau tidak sah |
| **Informasi (Blue)** | `#3B82F6` | Catatan regulasi OJK dan panduan teknis pengisian |

---

## 3. Sistem Tipografi (Typography)

SCOUT mengutamakan keterbacaan tinggi (*high legibility*) baik pada angka nominal keuangan maupun teks regulasi panjang.

- **Keluarga Font Utama:** `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `"Helvetica Neue"`, `sans-serif`.
- **Keluarga Font Angka / Finansial:** `font-mono` (untuk nomor dokumen, ID transaksi, dan kode akun).

### Hirarki Tipografi
| Tingkat | Ukuran (Mobile) | Ukuran (Desktop) | Ketebalan (*Weight*) | Contoh Penerapan |
|---|---|---|---|---|
| **Display / Hero** | 36px (`text-4xl`) | 56px (`text-6xl`) | 900 (`font-black`) | Judul Utama Landing Page |
| **Heading 1** | 28px (`text-3xl`) | 36px (`text-4xl`) | 800 (`font-extrabold`) | Judul Bagian (*Section Title*) |
| **Heading 2** | 20px (`text-xl`) | 24px (`text-2xl`) | 700 (`font-bold`) | Judul Kartu Fitur |
| **Body Regular** | 14px (`text-sm`) | 16px (`text-base`) | 400 (`font-normal`) | Paragraf penjelasan, FAQ |
| **Caption / Badge** | 11px (`text-[11px]`) | 12px (`text-xs`) | 600 (`font-semibold`) | Label status, catatan kaki |

---

## 4. Gaya Bahasa & Nada Komunikasi (*Tone of Voice*)

Bahasa yang digunakan SCOUT adalah **Bahasa Indonesia** yang mencerminkan 4 pilar utama:

### 4.1. Empat Pilar Nada Bicara
1. **Profesional & Kredibel:** Menggunakan terminologi keuangan dan hukum yang tepat tanpa menimbulkan kebingungan.
2. **Suportif & Mengayomi:** Memposisikan diri sebagai mitra seperjuangan UKM, bukan birokrat yang menghakimi kekurangan dokumen.
3. **Lugas & Solutif:** Memberikan rekomendasi perbaikan yang konkret dan dapat langsung dikerjakan (*action-oriented*).
4. **Transparan:** Menegaskan batas kewenangan SCOUT secara jujur dan tidak memberikan janji palsu kelolosan pendanaan.

### 4.2. Panduan *Do's & Don'ts*
| Hindari (*Don't*) | Gunakan (*Do*) |
|---|---|
| *"Dokumen Anda ditolak karena laporan keuangan buruk."* | *"Laporan keuangan Anda perlu penyesuaian pada rasio likuiditas sebelum siap diajukan ke platform SCF."* |
| *"Dijamin 100% langsung dapat modal Rp 10 Miliar!"* | *"Persiapkan dokumen Anda secara optimal untuk meningkatkan peluang lolos kurasi platform SCF."* |
| *"Klik di sini untuk invest dana ke UKM."* *(Salah kaprah peran platform)* | *"Mulai cek kesiapan dokumen bisnis Anda untuk penawaran efek SCF."* |

