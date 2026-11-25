# Database: Verifikasi Email dengan OTP (US-24)

## Tabel email_otps
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | ID unik kode OTP |
| user_id | uuid | Pemilik kode (users.id) |
| kode_hash | string | Kode 6 digit dalam bentuk hash, bukan teks polos |
| dibuat_pada | Date | Waktu kode dikirim |
| kedaluwarsa_pada | Date | Batas waktu kode masih berlaku, 10 menit setelah dikirim |
| digunakan | boolean | true setelah kode dipakai verifikasi |
| jumlah_percobaan | number:int | Jumlah salah memasukkan kode pada kode ini, batas 5 kali |
| tidak_berlaku | boolean | true bila batas percobaan tercapai atau kode diganti kode baru |
