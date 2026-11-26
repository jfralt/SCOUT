# Database: Tingkat Layanan FREE dan PREMIUM (US-08)

Sumber: user-stories-us-08.md dan user-flow-us-08.md.
Pertanyaan kunci: dari story ini, data apa yang perlu diingat aplikasi?
Jawabannya: tingkat layanan tiap akun, dan aturan fitur apa yang terbuka di tiap tingkat.

## Tabel users
Kolom tambahan:
- tingkat_layanan: string ('free', 'premium', 'consulting', 'full_service') default 'free'
- tingkat_diperbarui_pada: Date
