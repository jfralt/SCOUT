# User Flow: Disclaimer dan Syarat Ketentuan (US-18)

Tujuan: pengguna melihat pernyataan batas layanan SCOUT dengan jelas, agar tidak salah paham bahwa hasil SCOUT menjamin diterima atau merupakan saran investasi.

```mermaid
flowchart TD
  A([Mulai]) --> B{Pengguna sedang apa?}
  B -- Mendaftar --> C[Tampilkan form pendaftaran dengan tautan Syarat dan Ketentuan]
  C --> D{Pilih tautan?}
  D -- Tidak --> Z([Selesai])
  D -- Ya --> G[Buka halaman Syarat dan Ketentuan]
  B -- Melihat hasil penilaian atau kecocokan --> E[Tampilkan hasil dengan pernyataan batas layanan: indikatif dan bukan jaminan diterima, skor bukan skor investasi, pengajuan resmi di platform penyelenggara]
  E --> Z
  B -- Membuka Syarat dan Ketentuan --> G
  G --> H{Halaman berhasil dimuat?}
  H -- Tidak --> I[Tampil pesan error dan tombol Coba lagi]
  I --> G
  H -- Ya --> J[Tampilkan aturan pemakaian SCOUT]
  J --> K[Pengguna membaca]
  K --> L[Kembali ke halaman sebelumnya]
  L --> Z
```
