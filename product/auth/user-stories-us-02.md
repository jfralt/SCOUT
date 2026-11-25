# User Stories

## US-02 Mengisi Profil Bisnis (F-02)
- Prioritas: Must | Ukuran: M | Sprint: minggu ini
- Sebagai pemilik UKM calon penerbit, saya ingin mengisi profil bisnis dan
  kebutuhan dana, agar SCOUT bisa menyesuaikan checklist dokumen dan
  mencocokkan saya dengan penyelenggara SCF.

### Acceptance Criteria
1. Given saya sudah login, When saya membuka halaman profil, Then tampil
   form berisi bentuk badan hukum, sektor usaha, kebutuhan dana, dan
   kondisi dokumen.
2. Given ada kolom wajib yang kosong, When saya menekan Simpan, Then muncul
   pesan error pada kolom tersebut dan profil tidak tersimpan.
3. Given semua kolom wajib terisi, When saya menekan Simpan, Then profil
   tersimpan dan muncul konfirmasi.
4. Given saya sudah pernah mengisi profil, When saya membuka halaman profil
   lagi, Then data sebelumnya tampil dan bisa diubah.

### Referensi: BR-04, BR-05
