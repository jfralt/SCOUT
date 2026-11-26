# User Stories

## US-16 Dashboard Pengguna (F-16)
- Prioritas: Must | Ukuran: M | Sprint: berikutnya
- Sebagai pemilik UKM calon penerbit, saya ingin melihat ringkasan progres
  persiapan saya di satu halaman, agar saya tahu langkah berikutnya.

### Acceptance Criteria
1. Given saya sudah login, When saya membuka dashboard, Then tampil
   kelengkapan profil, persentase dokumen lengkap, dan tingkat layanan akun.
2. Given profil belum lengkap, Then dashboard menampilkan tombol Lengkapi
   Profil.
3. Given ada dokumen berstatus perlu revisi, Then dashboard menampilkan
   jumlahnya dengan tautan ke dokumen tersebut.
4. Given akun baru tanpa data, Then dashboard menampilkan langkah awal yang
   disarankan.
5. Given pengguna lain login, Then ia hanya melihat data miliknya sendiri.
6. Given email saya belum terverifikasi, When saya membuka dashboard, Then
   tampil banner Verifikasi emailmu dengan tombol Kirim Ulang Kode OTP.
7. Given banner tampil, When saya menekan Kirim Ulang Kode OTP, Then kode
   OTP baru dikirim ke email saya dan layar verifikasi OTP tampil.
8. Given email saya sudah terverifikasi, Then banner Verifikasi emailmu
   tidak tampil.

### Referensi: BR-05, US-24 (verifikasi email dengan OTP), US-02 (profil bisnis), US-04 (unggah dokumen)
