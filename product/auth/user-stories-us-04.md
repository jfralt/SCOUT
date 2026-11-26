# User Stories

## US-04 Mengunggah Dokumen dan Memantau Status (F-04)
- Prioritas: Must | Ukuran: L | Sprint: minggu ini
- Sebagai pemilik UKM calon penerbit, saya ingin mengunggah dokumen dan melihat progres kelengkapannya, agar saya tahu mana yang sudah lengkap dan mana yang masih kurang.

### Acceptance Criteria
1. Given email saya belum terverifikasi, When saya mencoba mengunggah dokumen, Then sistem menolak unggahan dan menampilkan pesan agar memverifikasi email terlebih dahulu.
2. Given email saya terverifikasi namun belum menyetujui pemrosesan data pribadi, When saya membuka pengunggahan dokumen, Then sistem menampilkan pernyataan persetujuan kebijakan privasi/data pribadi terlebih dahulu.
3. Given email terverifikasi dan telah menyetujui pemrosesan data, When saya memilih dokumen dan file yang valid (PDF, JPG, PNG maks 5MB), Then file berhasil disimpan dengan status lengkap.
4. Given file yang dipilih tidak sesuai format atau ukuran melebihi batas (5MB), Then sistem menampilkan pesan error yang jelas dan status dokumen tidak berubah.
5. Given beberapa dokumen telah diunggah, Then halaman checklist menampilkan jumlah dokumen lengkap dari total dan persentase kelengkapan secara real-time.
6. Given dokumen sudah memiliki file sebelumnya, When saya mengunggah file baru untuk dokumen tersebut, Then file lama digantikan dan status diperbarui.
7. Given pengguna lain mencoba mengakses dokumen milik saya, Then akses ditolak (dokumen hanya dapat diakses oleh pemilik akun - BR-05).

### Referensi: BR-04, BR-05, Non-Fungsional (keamanan)
