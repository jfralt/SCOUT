# User Stories

## US-05 Melihat Kecocokan Penyelenggara (F-06)
- Prioritas: Must | Ukuran: L | Sprint: minggu ini
- Sebagai pemilik UKM calon penerbit, saya ingin melihat penyelenggara SCF yang paling cocok dengan profil usaha saya, agar saya bisa memilih tujuan pengajuan dengan lebih yakin.

### Acceptance Criteria
1. Given profil saya sudah lengkap, When saya membuka halaman kecocokan, Then tampil daftar penyelenggara dengan tingkat kompatibilitas Tinggi, Sedang, atau Rendah dan estimasi biaya.
2. Given hasil tampil, Then setiap hasil menyertakan alasan singkat berdasarkan kriteria pencocokan (BR-06).
3. Given hasil tampil, Then ada pernyataan bahwa hasil bersifat indikatif dan bukan rekomendasi investasi (BR-01, BR-02).
4. Given profil belum lengkap, When saya membuka halaman kecocokan, Then saya diarahkan untuk melengkapi profil.
5. Given saya mengubah profil, When saya membuka halaman kecocokan lagi, Then hasil diperbarui sesuai profil terbaru.

### Referensi: BR-01, BR-02, BR-06, BR-07, data penyelenggara (dummy untuk MVP)
