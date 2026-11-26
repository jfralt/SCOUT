# User Stories

## US-08 Tingkat Layanan FREE dan PREMIUM (F-08)
- Prioritas: Must | Ukuran: M | Sprint: berikutnya
- Sebagai pemilik UKM calon penerbit, saya ingin tahu tingkat layanan akun
  saya dan fitur apa yang terbuka, agar saya tahu apa yang bisa dipakai dan
  kapan perlu upgrade.

### Acceptance Criteria
1. Given saya baru mendaftar, Then tingkat layanan akun saya adalah FREE.
2. Given akun FREE, When saya membuka fitur khusus PREMIUM, Then fitur
   terkunci, muncul penjelasan, dan ada tombol Lihat Paket.
3. Given akun PREMIUM, CONSULTING, atau FULL-SERVICE, Then fitur terbuka
   sesuai tabel tingkat layanan.
4. Given saya menekan upgrade (simulasi), Then tingkat akun berubah tanpa
   pembayaran nyata dan fitur yang sesuai terbuka.
5. Given fitur terkunci, When saya membuka alamatnya secara langsung, Then
   akses ditolak karena pengecekan tingkat dilakukan di sisi server.

### Referensi: PRD bagian 5 (pembayaran nyata tidak dibuat), tabel tingkat layanan
