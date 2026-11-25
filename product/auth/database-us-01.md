# Database: Registrasi dan Login (US-01)

Sumber: user-stories-us-01.md dan user-flow-us-01.md.
Pertanyaan kunci: dari story ini, data apa yang perlu diingat aplikasi?
Jawabannya: akun pengguna, status verifikasi emailnya, dan kode OTP yang dikirim saat mendaftar.

## Tabel users
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | ID unik pengguna |
| nama | string | Nama lengkap |
| email | string | Email untuk login dan tujuan kode OTP, unik |
| password_hash | string | Password dalam bentuk hash, bukan teks polos |
| email_terverifikasi | boolean | true setelah kode OTP benar dan masih berlaku |
| dibuat_pada | Date | Waktu akun dibuat |

## Tabel email_otps
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | ID unik kode OTP |
| user_id | uuid | Pemilik kode (users.id) |
| kode_hash | string | Kode 6 digit dalam bentuk hash, bukan teks polos |
| dibuat_pada | Date | Waktu kode dikirim |
| kedaluwarsa_pada | Date | Batas waktu kode masih berlaku, 10 menit setelah dikirim |
| digunakan | boolean | true setelah kode dipakai verifikasi |

## Hubungan antar tabel
- email_otps.user_id menunjuk ke users.id.
- Satu user bisa punya banyak baris email_otps, karena tiap Kirim Ulang membuat kode baru.

## Aturan data
- Email di users harus unik, dan inilah dasar keputusan "Email sudah terdaftar?".
- Kolom password_hash dan kode_hash tidak boleh berisi teks polos (AC5 dan Non-Fungsional keamanan).
- Keputusan "Kode benar?" membandingkan kode yang diketik dengan kode_hash milik kode terbaru user tersebut.
- Keputusan "Kode masih berlaku?" benar bila waktu sekarang belum melewati kedaluwarsa_pada dan digunakan masih false.
- Setiap Kirim Ulang membuat baris baru di email_otps, dan kode lama tidak berlaku lagi.
- Setelah kode benar dan masih berlaku, digunakan menjadi true dan email_terverifikasi di users menjadi true.
- Akun yang baru dibuat berstatus email_terverifikasi false sampai kode OTP benar dimasukkan.
