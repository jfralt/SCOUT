# Database: Halaman Detail Penyelenggara (US-35)

Sumber: user-stories-us-35.md dan user-flow-us-35.md.
Pertanyaan kunci: dari story ini, data apa yang perlu diingat aplikasi?
Jawabannya: informasi lengkap tiap penyelenggara (profil singkat, persyaratan, biaya, proses, dan tanggal data diperbarui), serta penyelenggara tujuan yang dipilih UKM.

## Tabel platforms
Kolom yang dipakai story ini:
- id: uuid
- nama: string
- profil_singkat: string (penjelasan singkat penyelenggara)
- jenis_efek_didukung: string
- persyaratan_umum: string
- estimasi_biaya: number
- tahapan_proses: string
- diperbarui_pada: Date
- aktif: boolean

## Tabel business_profiles
- platform_tujuan_id: uuid (penyelenggara tujuan yang dipilih lewat tombol Pilih Sebagai Tujuan)
