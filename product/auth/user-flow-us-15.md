# User Flow: Navigasi Menu dan Tampilan Responsif (US-15)

Tujuan: pengguna berpindah antar halaman lewat menu yang jelas dan nyaman di ponsel, agar tidak bingung memakai aplikasi.
Titik awal: pengguna berada di sebuah halaman aplikasi.
Titik akhir: halaman tujuan terbuka dengan menu aktif ditandai, atau pengguna tahu fitur terkunci, atau diarahkan ke halaman login.

```mermaid
flowchart TD
  A([Mulai]) --> B[Pengguna berada di sebuah halaman]
  B --> C{Sudah login?}
  C -- Tidak --> D[Tampilkan menu publik: Beranda dan Masuk]
  C -- Ya --> E[Tampilkan menu Dashboard, Profil Bisnis, Dokumen, Kecocokan, dan Akun]
  D --> F{Layar ponsel?}
  E --> F
  F -- Ya --> G[Menu berubah menjadi menu ringkas dan isi halaman tidak terpotong]
  F -- Tidak --> H[Tampilkan menu penuh]
  G --> I{Pilih menu}
  H --> I
  I -- Menu yang sedang aktif --> J[Tetap di halaman, posisi gulir kembali ke atas]
  J --> Z([Selesai])
  I -- Menu lain --> K{Fitur terkunci karena tingkat layanan?}
  K -- Ya --> L[Tampil penjelasan terkunci dan ajakan upgrade, menu tetap bertanda kunci]
  L --> Z
  K -- Tidak --> M[Buka halaman tujuan]
  M --> N{Halaman berhasil dimuat?}
  N -- Tidak --> O[Tampil halaman error dan tombol Coba Lagi]
  O --> I
  N -- Ya --> P[Tandai menu tujuan sebagai aktif]
  P --> Q{Halaman butuh login dan belum login?}
  Q -- Ya --> R[Arahkan ke halaman login]
  R --> Z
  Q -- Tidak --> Z
```
