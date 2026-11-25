# Database: Mengisi Profil Bisnis (US-02)

Sumber: user-stories-us-02.md dan user-flow-us-02.md.
Pertanyaan kunci: dari story ini, data apa yang perlu diingat aplikasi?
Jawabannya: profil bisnis tiap pemilik UKM, yaitu bentuk badan hukum, sektor usaha, kebutuhan dana, dan kondisi dokumennya.

## Tabel business_profiles
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | ID unik profil |
| user_id | uuid | Pemilik (users.id), satu user hanya punya satu profil |
| nama_bisnis | string | Nama bisnis / brand UKM |
| badan_hukum | string | Bentuk badan hukum: PT, CV, Koperasi, Perseorangan |
| sektor | string | Sektor usaha: Kuliner, Ritel, Jasa & Teknologi, Manufaktur, dll. |
| kebutuhan_dana | number:decimal | Kebutuhan dana dalam rupiah (minimum Rp 50.000.000) |
| kondisi_dokumen | string | Kondisi dokumen saat ini menurut pengguna |
| jangka_waktu_bulan | number:int | Jangka waktu pengembalian / pendanaan (12, 24, 36, 48) |
| tujuan_pendanaan | string | Tujuan: Pengembangan Usaha, Pembelian Peralatan, Pemasaran, Modal Kerja, Lainnya |
| rencana_penggunaan | string | Kategori rencana penggunaan dana |
| penjelasan_penggunaan | string | Uraian rinci rencana penggunaan dana |
| dokumen_pendukung_url | string | Path / URL dokumen pendukung (opsional) |
| status_draf | boolean | true jika simpan draf sementara |
| platform_tujuan_id | uuid | Penyelenggara tujuan (platforms.id), boleh kosong, diisi lewat US-35 |
| diperbarui_pada | Date | Waktu profil terakhir disimpan |

## Hubungan antar tabel
- business_profiles.user_id menunjuk ke users.id, dan nilainya unik sehingga satu user hanya punya satu profil.
- business_profiles.platform_tujuan_id menunjuk ke platforms.id.
