# Wireframe US-01: Registrasi dan Login

**User story:** Sebagai pemilik UKM calon penerbit, saya ingin membuat akun dan login, agar data profil dan dokumen saya tersimpan dan hanya bisa saya akses.

**Acuan:** flowchart registrasi/login (Mulai → Sudah punya akun? → Registrasi / Login → Halaman awal → Selesai).

---

## Daftar Layar

| Kode | Layar | Keterangan |
|------|-------|------------|
| W-01 | Pilihan Masuk | Titik awal, "Sudah punya akun?" |
| W-02 | Registrasi | Isi nama, email, password |
| W-03 | Registrasi: Error | Data tidak valid / email sudah dipakai |
| W-04 | Login | Isi email dan password |
| W-05 | Login: Error | Email atau password salah |
| W-06 | Halaman Awal | Tujuan setelah registrasi/login berhasil |

---

## W-01: Pilihan Masuk

```
+--------------------------------------------------+
|                    [ LOGO ]                      |
|              Nama Aplikasi Penerbit              |
|                                                  |
|     Kelola profil dan dokumen UKM Anda           |
|     dengan aman.                                 |
|                                                  |
|        Sudah punya akun?                         |
|                                                  |
|     +------------------------------------+       |
|     |              MASUK                 |       |   <- Sudah
|     +------------------------------------+       |
|                                                  |
|     +------------------------------------+       |
|     |            DAFTAR AKUN             |       |   <- Belum
|     +------------------------------------+       |
|                                                  |
+--------------------------------------------------+
```

**Navigasi:** `MASUK` → W-04 · `DAFTAR AKUN` → W-02

---

## W-02: Registrasi

```
+--------------------------------------------------+
|  < Kembali                                       |
|                                                  |
|                 Buat Akun Baru                   |
|                                                  |
|  Nama lengkap                                    |
|  +--------------------------------------------+  |
|  | Nama pemilik / UKM                         |  |
|  +--------------------------------------------+  |
|                                                  |
|  Email                                           |
|  +--------------------------------------------+  |
|  | nama@email.com                             |  |
|  +--------------------------------------------+  |
|                                                  |
|  Password                                        |
|  +--------------------------------------+-----+  |
|  | ********                             | (o) |  |
|  +--------------------------------------+-----+  |
|  Minimal 8 karakter, kombinasi huruf dan angka   |
|                                                  |
|  +--------------------------------------------+  |
|  |                  DAFTAR                    |  |
|  +--------------------------------------------+  |
|                                                  |
|        Sudah punya akun?  [Masuk]                |
|                                                  |
+--------------------------------------------------+
```

**Aturan validasi:**
- Nama, email, dan password wajib diisi.
- Format email harus valid.
- Email belum pernah dipakai akun lain.
- Password memenuhi aturan minimal.

**Proses:** data valid dan email belum dipakai → akun disimpan, **password di-hash** → W-06.
Jika tidak → W-03.

---

## W-03: Registrasi: Error

```
+--------------------------------------------------+
|  < Kembali                                       |
|                                                  |
|                 Buat Akun Baru                   |
|                                                  |
|  +--------------------------------------------+  |
|  | (!) Pendaftaran gagal. Periksa kembali     |  |
|  |     data Anda.                             |  |
|  +--------------------------------------------+  |
|                                                  |
|  Nama lengkap                                    |
|  +--------------------------------------------+  |
|  | Budi Santoso                               |  |
|  +--------------------------------------------+  |
|                                                  |
|  Email                                           |
|  +--------------------------------------------+  |  <- garis merah
|  | budi@email.com                             |  |
|  +--------------------------------------------+  |
|  (!) Email sudah terdaftar. Gunakan email lain   |
|      atau masuk.                                 |
|                                                  |
|  Password                                        |
|  +--------------------------------------+-----+  |
|  | ********                             | (o) |  |
|  +--------------------------------------+-----+  |
|                                                  |
|  +--------------------------------------------+  |
|  |                  DAFTAR                    |  |
|  +--------------------------------------------+  |
|                                                  |
+--------------------------------------------------+
```

**Pesan error per kondisi:**

| Kondisi | Pesan |
|---------|-------|
| Kolom kosong | "Kolom ini wajib diisi." |
| Format email salah | "Format email tidak valid." |
| Email sudah dipakai | "Email sudah terdaftar. Gunakan email lain atau masuk." |
| Password lemah | "Password minimal 8 karakter, kombinasi huruf dan angka." |

**Navigasi:** setelah error, pengguna kembali mengisi form W-02 (isian nama dan email tetap tersimpan, password dikosongkan).

---

## W-04: Login

```
+--------------------------------------------------+
|  < Kembali                                       |
|                                                  |
|                  Masuk ke Akun                   |
|                                                  |
|  Email                                           |
|  +--------------------------------------------+  |
|  | nama@email.com                             |  |
|  +--------------------------------------------+  |
|                                                  |
|  Password                                        |
|  +--------------------------------------+-----+  |
|  | ********                             | (o) |  |
|  +--------------------------------------+-----+  |
|                                                  |
|  +--------------------------------------------+  |
|  |                   MASUK                    |  |
|  +--------------------------------------------+  |
|                                                  |
|        Belum punya akun?  [Daftar]               |
|                                                  |
+--------------------------------------------------+
```

**Proses:** email dan password cocok → W-06. Jika tidak → W-05.

---

## W-05: Login: Error

```
+--------------------------------------------------+
|  < Kembali                                       |
|                                                  |
|                  Masuk ke Akun                   |
|                                                  |
|  +--------------------------------------------+  |
|  | (!) Email atau password salah.             |  |
|  +--------------------------------------------+  |
|                                                  |
|  Email                                           |
|  +--------------------------------------------+  |
|  | nama@email.com                             |  |
|  +--------------------------------------------+  |
|                                                  |
|  Password                                        |
|  +--------------------------------------+-----+  |
|  |                                      | (o) |  |
|  +--------------------------------------+-----+  |
|                                                  |
|  +--------------------------------------------+  |
|  |                   MASUK                    |  |
|  +--------------------------------------------+  |
|                                                  |
|        Belum punya akun?  [Daftar]               |
|                                                  |
+--------------------------------------------------+
```

**Catatan:** pesan error sengaja tidak menyebutkan mana yang salah (email atau password) agar tidak membocorkan email yang terdaftar.

---

## W-06: Halaman Awal

```
+--------------------------------------------------+
|  [LOGO]  Nama Aplikasi            [Budi S. v]    |
|----------------------------------------------    |
|                                                  |
|  Selamat datang, Budi!                           |
|                                                  |
|  +------------------+  +------------------+      |
|  |  Profil UKM      |  |  Dokumen Saya    |      |
|  |  (belum lengkap) |  |  0 dokumen       |      |
|  |  [Lengkapi]      |  |  [Unggah]        |      |
|  +------------------+  +------------------+      |
|                                                  |
|  Data Anda tersimpan aman dan hanya dapat        |
|  diakses oleh Anda.                              |
|                                                  |
|                                    [ Keluar ]    |
+--------------------------------------------------+
```

**Catatan:** isi halaman awal akan dirinci di user story berikutnya. Untuk US-01 cukup menunjukkan bahwa registrasi atau login berhasil dan data hanya milik pengguna tersebut.
