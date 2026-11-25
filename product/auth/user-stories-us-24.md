# User Stories

## US-24 Verifikasi Email dengan OTP (F-24)
- Prioritas: Must | Ukuran: M | Sprint: minggu ini
- Sebagai pengguna, saya ingin memverifikasi email saya dengan kode OTP,
  agar akun saya terbukti milik saya.

### Acceptance Criteria
1. Given saya baru mendaftar, Then kode OTP 6 digit dikirim ke email yang
   saya isi dan layar verifikasi OTP tampil.
2. Given layar OTP tampil, When saya memasukkan kode yang benar dan masih
   berlaku, Then email saya berstatus terverifikasi dan muncul konfirmasi.
3. Given saya memasukkan kode yang salah, Then muncul pesan kode salah dan
   saya bisa memasukkan kode lagi.
4. Given saya salah memasukkan kode sebanyak 5 kali pada kode yang sama,
   Then kode itu tidak berlaku lagi dan saya diminta meminta kode baru
   lewat Kirim Ulang.
5. Given kode sudah kedaluwarsa setelah 10 menit, When saya
   memasukkannya, Then muncul pesan kode kedaluwarsa dan saya bisa meminta
   kode baru.
6. Given saya menekan Kirim Ulang, Then kode baru dikirim ke email saya dan
   kode sebelumnya tidak berlaku lagi.
7. Given email saya belum terverifikasi, Then tampil pengingat dengan
   tombol Kirim Ulang Kode OTP.
8. Given email saya belum terverifikasi, When saya mencoba mengunggah
   dokumen, Then unggahan ditolak dengan pesan agar saya memverifikasi
   email dulu.

### Referensi: BR-04, Non-Fungsional (keamanan), US-01 (pendaftaran), US-04 (unggah dokumen)
