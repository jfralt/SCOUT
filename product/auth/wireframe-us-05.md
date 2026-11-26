# Wireframe: Kecocokan Penyelenggara SCF (US-05)

**User story:** Sebagai pemilik UKM calon penerbit, saya ingin melihat penyelenggara SCF yang paling cocok dengan profil usaha saya, agar saya bisa memilih tujuan pengajuan dengan lebih yakin.

**Acuan:** flowchart halaman Kecocokan (cek login → cek profil lengkap → sistem mencocokkan → daftar penyelenggara → alasan dan pernyataan indikatif → pilih aksi).

Wireframe dibuat dengan tampilan ponsel (mobile-first). Kode layar memakai awalan **W-KC** (Kecocokan).

---

## Daftar Layar

| Kode | Layar | Titik pada flowchart |
|------|-------|----------------------|
| W-KC.1 | Profil Belum Lengkap | Profil sudah lengkap? Belum → Ke profil bisnis |
| W-KC.2 | Form Profil Bisnis | Lengkapi dan simpan profil, dan Ubah profil dan simpan perubahan |
| W-KC.3 | Memproses Kecocokan | Sistem mencocokkan profil dengan data penyelenggara |
| W-KC.4 | Daftar Penyelenggara Paling Cocok | Tampil daftar, alasan singkat, dan pernyataan indikatif |

**Prasyarat akses (tanpa layar baru):** jika belum login, pengguna diarahkan ke halaman login.
