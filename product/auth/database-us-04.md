# Database: Mengunggah Dokumen dan Memantau Status (US-04)

Sumber: user-stories-us-04.md dan user-flow-us-04.md.
Pertanyaan kunci: dari story ini, data apa yang perlu diingat aplikasi?
Jawabannya: file dokumen yang diunggah beserta statusnya, dan persetujuan pemrosesan data pribadi.
Story ini juga membaca data dari tabel lain: users.email_terverifikasi (database-us-01.md) dan document_requirements (daftar dokumen per penyelenggara dari US-03).

## Tabel documents
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | ID unik dokumen terunggah |
| user_id | uuid | Pemilik (users.id) |
| requirement_id | uuid | Persyaratan yang dipenuhi (document_requirements.id) |
| nama_file | string | Nama file asli |
| lokasi_file | string | Lokasi penyimpanan file |
| ukuran_kb | number:int | Ukuran file dalam KB |
| status | string | lengkap, perlu revisi |
| diunggah_pada | Date | Waktu file pertama diunggah |
| diperbarui_pada | Date | Waktu file terakhir diganti atau status terakhir berubah |

## Tabel consents
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | ID unik persetujuan |
| user_id | uuid | Pemilik (users.id) |
| jenis | string | Jenis persetujuan, misalnya pemrosesan_data_pribadi |
| disetujui | boolean | Sudah setuju atau belum |
| tanggal | Date | Waktu persetujuan |

## Hubungan antar tabel
- documents.user_id dan consents.user_id menunjuk ke users.id.
- documents.requirement_id menunjuk ke document_requirements.id.
- Satu user punya banyak documents, tetapi hanya satu baris untuk setiap requirement_id.

## Aturan data
- Keputusan "Email sudah terverifikasi?" membaca users.email_terverifikasi.
- Keputusan "Sudah setuju pemrosesan data pribadi?" membaca consents dengan jenis pemrosesan_data_pribadi dan disetujui bernilai true.
- Unggahan hanya diproses bila kedua syarat di atas terpenuhi, dan pengecekannya dilakukan di sisi server.
- Format file dibatasi PDF, JPG, dan PNG dengan ukuran maksimal 5 MB, dan dicek sebelum file disimpan.
- Baris documents baru dibuat saat file pertama berhasil diunggah dengan status lengkap, sedangkan dokumen yang belum punya baris dianggap berstatus belum ada.
- Mengganti file pada dokumen yang sudah ada memperbarui baris yang sama (nama_file, lokasi_file, ukuran_kb, diperbarui_pada) dan tidak membuat baris baru.
- Status perlu revisi dipakai oleh fitur lain (penilaian AI dan peninjauan), dan saat file diganti statusnya kembali menjadi lengkap.
- Progres dihitung saat halaman dibuka: jumlah documents berstatus lengkap dibagi jumlah document_requirements penyelenggara tujuan, dikali 100 persen, sehingga tidak disimpan di tabel.
- Setiap query documents difilter dengan user_id pemilik agar pengguna lain tidak bisa membuka dokumen (BR-05).
