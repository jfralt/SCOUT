# User Flow: Verifikasi Email dengan OTP (US-24)

Tujuan: pengguna memverifikasi emailnya dengan kode OTP 6 digit, agar akun terbukti milik pengguna tersebut.
Titik awal: pengguna baru mendaftar, login dengan email yang belum terverifikasi, atau mencoba mengunggah dokumen sebelum verifikasi.
Titik akhir: email terverifikasi, atau pengguna meninggalkan aplikasi dengan akun yang masih belum terverifikasi.

```mermaid
flowchart TD
  A([Mulai]) --> B{Pengguna berada di mana?}
  B -- Baru mendaftar --> C[Buat kode OTP 6 digit dan kirim ke email yang diisi]
  B -- Login dengan email belum terverifikasi --> P[Tampil pengingat dengan tombol Kirim Ulang Kode OTP]
  B -- Mencoba mengunggah dokumen --> U[Unggahan ditolak, tampil pesan agar memverifikasi email dulu]
  P --> Q{Pilih Kirim Ulang Kode OTP?}
  U --> Q
  Q -- Tidak --> Z([Selesai])
  Q -- Ya --> C
  C --> D[Tampil layar OTP dengan kolom kode dan tombol Kirim Ulang]
  D --> E{Pengguna memilih apa?}
  E -- Tekan Kirim Ulang --> C
  E -- Keluar dari aplikasi --> Z
  E -- Isi kode --> F{Kode benar?}
  F -- Tidak --> G[Tampil pesan kode salah]
  G --> H{Batas percobaan tercapai?}
  H -- Tidak --> E
  H -- Ya --> I[Kode tidak berlaku lagi, tampil pesan agar meminta kode baru]
  I --> E
  F -- Ya --> J{Kode masih berlaku?}
  J -- Tidak --> K[Tampil pesan kode kedaluwarsa dan tombol Kirim Ulang]
  K --> E
  J -- Ya --> L[Email terverifikasi]
  L --> M[Tampil konfirmasi]
  M --> Z
```

Setiap kali kode baru dikirim (dari pendaftaran atau Kirim Ulang), kode sebelumnya tidak berlaku lagi.
