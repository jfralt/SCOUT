# User Flow: Beranda (US-14)

Tujuan: calon pengguna melihat halaman beranda yang menjelaskan SCOUT, agar paham manfaatnya sebelum mendaftar.
Titik awal: pengguna membuka alamat aplikasi.
Titik akhir: pengguna membaca beranda lalu memilih Daftar atau Login, hanya membaca, atau diarahkan ke dashboard bila sudah login.

```mermaid
flowchart TD
  A([Mulai]) --> B[Buka alamat aplikasi]
  B --> C{Berhasil dimuat?}
  C -- Tidak --> D[Tampil halaman error dan tombol Coba Lagi]
  D --> B
  C -- Ya --> E{Sudah login?}
  E -- Ya --> F[Arahkan ke dashboard]
  F --> Z([Selesai])
  E -- Tidak --> G[Tampilkan beranda berisi penjelasan SCOUT, empat tahap layanan, dan pernyataan bukan penyelenggara SCF]
  G --> H{Pilih aksi?}
  H -- Daftar --> I[Buka halaman registrasi]
  I --> Z
  H -- Login --> J[Buka halaman login]
  J --> Z
  H -- Hanya membaca --> Z
```

Empat tahap layanan SCOUT: PREPARE, ASSESS, MATCH, dan ONBOARD.
