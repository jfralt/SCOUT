# User Flow: Melihat Kecocokan Penyelenggara (US-05)

Tujuan: pemilik UKM calon penerbit melihat penyelenggara SCF yang paling cocok dengan profil usahanya, agar bisa memilih tujuan pengajuan dengan lebih yakin.
Titik awal: pengguna login dan membuka halaman kecocokan.
Titik akhir: hasil kecocokan tampil beserta pernyataan indikatif, atau pengguna diarahkan melengkapi profil dulu.

```mermaid
flowchart TD
  A([Mulai]) --> B[Login]
  B --> C[Buka halaman kecocokan]
  C --> D{Berhasil dimuat?}
  D -- Tidak --> E[Tampil halaman error dan tombol Coba Lagi]
  E --> C
  D -- Ya --> F{Profil sudah lengkap?}
  F -- Tidak --> G[Arahkan ke halaman profil]
  G --> H[Lengkapi atau ubah profil]
  H --> F
  F -- Ya --> I[Hitung kecocokan tiap penyelenggara dari profil terbaru]
  I --> J[Tampilkan tingkat kompatibilitas Tinggi, Sedang, atau Rendah, estimasi biaya, dan alasan singkat per penyelenggara]
  J --> K[Tampilkan pernyataan indikatif dan bukan rekomendasi investasi]
  K --> L{Pilih aksi?}
  L -- Ubah profil --> H
  L -- Buka detail penyelenggara --> M[Buka halaman detail penyelenggara]
  M --> Z([Selesai])
  L -- Hanya melihat --> Z
```

## Terhubung ke

US-05 Melihat Kecocokan Penyelenggara (F-06). Referensi: BR-01, BR-02, BR-06, BR-07, dan data penyelenggara (dummy untuk MVP).
Keputusan "Profil sudah lengkap?" memakai profil dari US-02. Pernyataan indikatif sejalan dengan US-18. Pilihan jenis efek di US-27 menjadi salah satu kriteria, dan halaman detail penyelenggara ada di US-35.
Halaman terkait: dashboard (US-16), halaman error (US-23), bandingkan penyelenggara (US-36).
