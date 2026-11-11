# Spesifikasi Fitur: Landing Page & Simulasi Tabungan (landing-page/specification.md)

## 1. Deskripsi Fitur
Halaman utama (*landing page*) berfungsi sebagai etalase utama sekaligus sarana edukasi dan kalkulator simulasi tabungan interaktif. Fitur ini dirancang dengan tema warna **Kuning dan Hitam**, bahasa Indonesia, dan memiliki tombol utama **"Mulai"** yang mengarahkan pengguna langsung ke kalkulator.

## 2. Struktur Komponen Antarmuka
1. **Header (Navbar):** Logo brand Tabungin, navigasi bagian, dan tombol aksi "Mulai".
2. **Hero Section:** Judul utama, deskripsi nilai produk, metrik sosial proof, mockup kartu tabungan visual, dan tombol "Mulai Sekarang".
3. **Kalkulator Simulasi Tabungan:**
   - 6 Template tujuan instan (Dana Darurat, DP Rumah, Kendaraan, Liburan, Menikah, Usaha).
   - Input Target Tabungan (dengan tombol tambah cepat +5 Jt, +10 Jt, +25 Jt, +50 Jt, +100 Jt).
   - Input Saldo Awal Saat Ini.
   - Slider Jangka Waktu (1 - 60 Bulan).
   - Pengaturan Bunga/Imbal Hasil Tahunan (0% Tunai, 4% Deposito, 6% Reksadana, 9% Investasi).
   - Hasil Real-Time: Setoran wajib bulanan, estimasi harian, komposisi modal vs bunga, dan tombol "Salin Ringkasan".
4. **Keunggulan (Features):** 6 kartu keunggulan kalkulasi presisi, privasi lokal 100%, dll.
5. **Cara Kerja (How It Works):** 3 langkah mudah menabung terencana.
6. **Testimoni:** Cerita dari berbagai profil pengguna (karyawan, freelancer, pemilik bisnis).
7. **FAQ:** Pertanyaan yang sering diajukan mengenai kalkulasi, bunga, dan keamanan.
8. **CTA Banner:** Ajakan bertindak penutup dengan tombol "Mulai".

## 3. Rumus Bunga Majemuk (Compound Interest)
- Jika $r = \frac{\text{annualRate}}{100 \times 12}$ dan $n = \text{durationMonths}$:
  $$\text{FV}_{\text{initial}} = \text{initialSavings} \times (1 + r)^n$$
  $$\text{Remaining} = \text{targetAmount} - \text{FV}_{\text{initial}}$$
  $$\text{monthlyDeposit} = \text{Remaining} \times \frac{r}{(1+r)^n - 1}$$
- Total Disetor: $\text{initialSavings} + (\text{monthlyDeposit} \times n)$.
- Keuntungan Bunga: $\text{totalFutureValue} - \text{totalDeposited}$.

