# User Stories

## US-01 Registrasi dan Login (F-01)
- Prioritas: Must | Ukuran: S | Sprint: minggu ini
- Sebagai pemilik UKM calon penerbit, saya ingin membuat akun dan login,
  agar data profil dan dokumen saya tersimpan dan hanya bisa saya akses.

### Acceptance Criteria
1. Given saya belum punya akun, When saya mengisi nama, email, dan password
   yang valid lalu menekan Daftar, Then akun terbuat, kode OTP 6 digit
   dikirim ke email saya, dan layar verifikasi OTP tampil; setelah saya
   memasukkan kode yang benar, saya masuk ke halaman awal.
2. Given email sudah terdaftar, When saya mendaftar dengan email yang sama,
   Then muncul pesan error email sudah dipakai.
3. Given saya punya akun, When saya login dengan email dan password yang
   benar, Then saya masuk ke halaman awal.
4. Given saya salah memasukkan password, When saya menekan Login,
   Then muncul pesan error dan saya tetap di halaman login.
5. Given password disimpan, Then password tidak tersimpan polos di database.

### Referensi: BR-05, Non-Fungsional (keamanan), US-24 (verifikasi OTP)
