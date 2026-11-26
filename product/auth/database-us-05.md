# Database: Melihat Kecocokan Penyelenggara (US-05)

Sumber: user-stories-us-05.md dan user-flow-us-05.md.
Pertanyaan kunci: dari story ini, data apa yang perlu diingat aplikasi?
Jawabannya: data penyelenggara (kriteria dan estimasi biaya) yang dicocokkan dengan profil bisnis UKM. Hasil kecocokannya dihitung saat halaman dibuka dan tidak disimpan.

## Tabel platforms
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | ID unik penyelenggara |
| nama | string | Nama penyelenggara SCF |
| fokus_sektor | string | Sektor usaha yang menjadi fokus penyelenggara |
| badan_hukum_diterima | string | Bentuk badan hukum yang diterima |
| dana_minimum | number:decimal | Batas bawah kebutuhan dana yang dilayani |
| dana_maksimum | number:decimal | Batas atas kebutuhan dana yang dilayani |
| jenis_efek_didukung | string | Jenis efek yang didukung: saham, obligasi, atau sukuk |
| estimasi_biaya | number:decimal | Estimasi biaya bagi penerbit |
| deskripsi | string | Profil ringkas platform |
| keunggulan | string | Keunggulan utama platform |
| aktif | boolean | true bila penyelenggara boleh tampil di hasil |

## Tabel business_profiles
Kolom yang dibaca story ini (tabel lengkap ada di database-us-02.md).

| Kolom | Tipe | Keterangan |
|---|---|---|
| user_id | uuid | Pemilik profil (users.id) |
| badan_hukum | string | Dibandingkan dengan platforms.badan_hukum_diterima |
| sektor | string | Dibandingkan dengan platforms.fokus_sektor |
| kebutuhan_dana | number:decimal | Dibandingkan dengan kisaran dana_minimum sampai dana_maksimum |
| jenis_efek | string | Dibandingkan dengan platforms.jenis_efek_didukung |
