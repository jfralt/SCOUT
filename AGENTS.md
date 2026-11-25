<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md - Panduan Kerja Agen AI SCOUT

Dokumen ini menjadi aturan utama bagi seluruh AI Agent yang bekerja pada proyek SCOUT. Setiap Agent wajib membaca dan mengikuti panduan ini sebelum melakukan perubahan pada proyek.

---

## 1. Gambaran Proyek

**SCOUT** adalah platform pendamping UKM di Indonesia yang ingin mempersiapkan penggalangan dana melalui skema Securities Crowdfunding (SCF).

SCOUT membantu UKM mempersiapkan dokumen, mengevaluasi kesiapan usaha, dan menemukan platform penyelenggara SCF yang sesuai.

### Tiga Fitur Utama

1. **Document Tracking:** Memantau kelengkapan dan status dokumen administratif, legalitas, dan keuangan UKM secara terpusat.
2. **Document Assessment:** Mengevaluasi kelayakan dokumen dan menghasilkan SCF Readiness Score (0-100), disertai panduan perbaikan.
3. **Platform Matchmaking:** Mencocokkan profil UKM, sektor usaha, target pendanaan, dan instrumen pendanaan dengan platform penyelenggara SCF yang sesuai.

---

## 2. Aturan Utama (Golden Rules)

### 2.1 Seluruh Fitur Terpusat di Folder `auth/` (Golden Rule Utama)

- **Mulai sekarang, SELURUH fitur SCOUT tanpa terkecuali harus berada dalam satu pasang folder:**
  - **Dokumentasi seluruh fitur:** `product/auth/`
  - **Implementasi kode seluruh fitur:** `modules/auth/`
- Aturan ini berlaku permanen untuk semua fitur yang sudah ada maupun seluruh fitur baru yang akan dikembangkan ke depannya, bukan hanya fitur autentikasi.
- **DILARANG** membuat folder fitur baru secara terpisah di dalam `product/` maupun `modules/`.
- Folder `_general/` tetap dipertahankan untuk PRD, personas, brand guidelines, tech stack, dan glossary umum.
- Folder sistem (`shared/`, `db/`, `project/`, `app/`) tetap pada tempatnya.

### 2.2 Baca Dokumentasi Sebelum Coding

- Wajib membaca `AGENTS.md`, dokumentasi umum, dan dokumentasi fitur yang relevan sebelum menulis kode.
- Dokumentasi produk menjadi acuan utama implementasi.
- Baca seluruh dokumen fitur yang tersedia dan relevan sebelum menulis kode.

### 2.3 Ikuti Spesifikasi Fitur

Implementasi harus mengikuti:
- User Story (US).
- User Flow (UF).
- Wireframe (WF).
- Mockup (MO).
- Data Structure (DT).
- Acceptance Criteria jika tersedia.

Jangan mengubah alur atau menambahkan fitur di luar ruang lingkup tanpa persetujuan pengguna.

### 2.4 Jaga Konsistensi Proyek

- Gunakan struktur folder dan standar teknologi yang sudah ditentukan.
- Hindari membuat file, komponen, atau fungsi duplikat.
- Jangan mengubah konfigurasi yang masih digunakan tanpa alasan teknis yang jelas.

### 2.5 Bedakan Fakta, Asumsi, dan Rencana

- Jangan mengarang hasil riset, wawancara, atau data pengguna.
- Tandai asumsi jika dokumentasi belum memberikan informasi yang cukup.
- Laporkan informasi yang belum tersedia kepada pengguna.

### 2.6 Keamanan Data

- Gunakan data dummy untuk pengembangan dan pengujian.
- Jangan menggunakan data pribadi atau data nasabah asli.
- Jangan menyimpan password dalam bentuk plaintext.
- Jangan mengunggah `.env`, `.env.local`, API key, password, atau kredensial ke GitHub.
- Jangan menampilkan informasi sensitif dalam log atau pesan error.

---

## 3. Struktur Direktori Proyek

```text
example/
├── CLAUDE.md
├── GEMINI.md
├── AGENTS.md
│
├── app/
│   └── ... (routing halaman Next.js, Thin Routes)
│
├── product/
│   ├── _general/
│   │   ├── prd.md
│   │   ├── personas.md
│   │   ├── brand-guideline.md
│   │   ├── tech-stack.md
│   │   └── glossary.md
│   │
│   └── auth/ (WADAH TUNGGAL DOKUMENTASI SELURUH FITUR SCOUT)
│       ├── database-us-01.md
│       ├── database-us-02.md
│       ├── database-us-24.md
│       ├── user-stories-*.md
│       ├── user-flow-*.md
│       ├── wireframe-*.md
│       └── ...
│
├── modules/
│   ├── _general/
│   │   ├── types/
│   │   └── utils/
│   │
│   └── auth/ (WADAH TUNGGAL IMPLEMENTASI KODE SELURUH FITUR SCOUT)
│       ├── components/ (Komponen UI seluruh fitur)
│       ├── types/ (Tipe data seluruh fitur)
│       ├── utils/ (Utilitas & DB logic seluruh fitur)
│       ├── actions.ts (Server actions seluruh fitur)
│       └── index.ts (Entry point export seluruh fitur)
│
├── shared/
│   └── ...
│
├── db/
│   ├── schema.prisma
│   └── ...
│
├── project/
│   └── prompt-log.md
│
└── ...
```

### 3.1 Peran Setiap Folder

**`app/`**
- Menyimpan routing halaman, layout, dan metadata.
- Menggunakan pendekatan Thin Routes.
- Tidak menempatkan business logic kompleks di dalam file routing.
- Mengimpor komponen atau kontainer fitur dari `modules/auth/`.

**`product/`**
- Menyimpan dokumentasi dan spesifikasi produk.
- Menjadi sumber acuan utama implementasi fitur.

**`product/_general/`**
- Menyimpan dokumentasi umum yang berlaku untuk seluruh fitur SCOUT.
- Meliputi PRD, personas, brand guideline, tech stack, dan glossary.

**`product/auth/`**
- **Wadah tunggal dokumentasi SELURUH fitur SCOUT.**
- Semua dokumen User Story (US), User Flow (UF), Wireframe (WF), Mockup (MO), dan Data Structure (DT) untuk setiap fitur wajib disimpan di folder ini.

**`modules/`**
- Menyimpan implementasi kode proyek SCOUT.

**`modules/auth/`**
- **Wadah tunggal kode implementasi SELURUH fitur SCOUT.**
- Menyimpan komponen UI, business logic, server actions, types, dan utils untuk semua fitur aplikasi (Registrasi, Login, OTP, Profil Bisnis, Dashboard, Landing Page, Syarat Ketentuan, dan fitur-fitur baru selanjutnya).

Struktur internal `modules/auth/`:

```text
modules/auth/
├── components/
├── types/
├── utils/
├── actions.ts
└── index.ts
```

**`shared/`**
- Menyimpan komponen UI dan fungsi utilitas yang digunakan bersama oleh minimal dua fitur.

**`db/`**
- Menyimpan satu schema Prisma untuk seluruh fitur, migrasi, dan seed database.

**`project/`**
- Menyimpan prompt log dan catatan proses pengembangan.

---

## 4. Standar Teknologi dan Coding

### 4.1 Framework dan Bahasa

- Framework: Next.js App Router dan React.
- Bahasa: TypeScript dengan Strict Mode.
- Hindari penggunaan tipe `any`.
- Ikuti dokumentasi Next.js lokal di `node_modules/next/dist/docs/` sebelum menggunakan API atau fitur Next.js.
- Gunakan versi dependency yang sudah tersedia dalam proyek.

### 4.2 Database dan ORM

- Database lokal: SQLite.
- Database production: PostgreSQL melalui Supabase.
- ORM: Prisma.
- Gunakan pendekatan **schema-first**.
- Hanya gunakan satu file `db/schema.prisma` untuk SEMUA fitur.
- Jangan membuat schema database terpisah untuk setiap fitur.

#### Aturan Perancangan Schema

1. Baca semua dokumen `product/*/dt*.md` yang relevan sebelum mengubah schema.
2. Tentukan tabel dan relasi berdasarkan kebutuhan data seluruh fitur.
3. Lakukan normalisasi untuk menghindari duplikasi data.
4. Tentukan primary key dan foreign key dengan tepat.
5. Tambahkan kolom teknis yang diperlukan, seperti `passwordHash` dan `createdAt`.
6. Pastikan perubahan tidak merusak tabel atau relasi yang digunakan fitur lain.
7. Periksa relasi antartabel sebelum melakukan migrasi.

#### Setelah Schema Berubah

1. Jalankan migrasi menggunakan:

   `npx prisma migrate dev --name <deskripsi-singkat>`

2. Jangan mengedit atau menghapus file migrasi yang sudah pernah dijalankan.
3. Periksa hasil migrasi dan pastikan schema sesuai kebutuhan.
4. Laporkan tabel yang dibuat atau diubah.
5. Jangan mengubah tabel yang digunakan fitur lain tanpa menjelaskan alasan teknisnya.

#### Batasan Database

- Jangan membuat schema Prisma per fitur.
- Jangan mengubah tabel fitur lain tanpa alasan teknis yang jelas.
- Jika perubahan berpotensi memengaruhi fitur lain, jelaskan dampaknya sebelum implementasi.
- Jangan menjalankan migrasi production tanpa persetujuan pengguna.

### 4.3 Autentikasi dan Keamanan

- Gunakan JSON Web Token (JWT) untuk autentikasi.
- Simpan token dalam HTTP-only cookie.
- Gunakan bcrypt untuk hashing password.
- Validasi input menggunakan Zod.
- Lakukan validasi autentikasi dan otorisasi di server.
- Pastikan pengguna hanya dapat mengakses data miliknya sendiri.
- Jangan pernah menyimpan password dalam bentuk plaintext.

### 4.4 Styling dan UI/UX

- Gunakan Tailwind CSS.
- Ikuti identitas visual SCOUT:
  - Primary Blue: `#5170FF`
  - Black: `#000000`
  - White: `#FFFFFF`

Ketentuan desain:

- Gunakan logo resmi SCOUT dari folder `public/`.
- Jangan membuat ulang atau mengubah bentuk logo resmi.
- Jadikan wireframe dan mockup sebagai acuan utama desain.
- Jangan membuat layout atau alur baru yang bertentangan dengan dokumentasi.
- Pertahankan konsistensi warna, tipografi, spacing, dan komponen.
- Pastikan tampilan responsif pada desktop dan mobile.

### 4.5 Standar Tambahan

- Validasi: Zod.
- Testing: Vitest.
- Code quality: ESLint dan Prettier.
- Rahasia dan kredensial: `.env` atau `.env.local`.

Gunakan dependency dan versi teknologi yang sudah tersedia. Jangan menambahkan library atau memperbarui dependency tanpa alasan teknis yang jelas.

### 4.6 Gaya Bahasa

- Gunakan Bahasa Indonesia yang formal, profesional, dan mudah dipahami pelaku UKM.
- Gunakan istilah produk secara konsisten.
- Tombol aksi utama harus memiliki label yang jelas dan menggunakan warna Primary Blue.

---

## 5. Urutan Membaca Dokumentasi (Progressive Context Loading)

AI Agent wajib membaca konteks proyek dari informasi umum menuju spesifikasi fitur yang lebih khusus.

Ikuti urutan berikut:

### Tahap 1. Instruksi Agent

- Baca file instruksi sesuai Agent yang digunakan, seperti `CLAUDE.md` atau `GEMINI.md` jika tersedia.
- Baca `AGENTS.md` sebagai aturan utama proyek.
- Ikuti instruksi khusus Agent selama tidak bertentangan dengan `AGENTS.md`.

### Tahap 2. Dokumentasi Umum

Baca dokumen yang relevan di `product/_general/`.

Prioritaskan:

- `prd.md`
- `brand-guideline.md`
- `tech-stack.md`

Baca `personas.md` dan `glossary.md` jika relevan dengan tugas.

### Tahap 3. Dokumentasi Fitur

Baca seluruh dokumen yang tersedia dan relevan di `product/auth/` sebelum menulis kode.

Jenis dokumentasi:

- `US`: User Story.
- `UF`: User Flow.
- `WF`: Wireframe.
- `MO`: Mockup.
- `DT`: Data Structure.

Ketentuan:

- Jangan hanya membaca user story atau user flow.
- Pastikan memahami seluruh spesifikasi fitur yang tersedia di `product/auth/`.
- Jangan melewatkan dokumen Data Structure (DT), karena dokumen tersebut menjadi acuan perancangan database.
- Jika dokumen wajib belum tersedia, laporkan kepada pengguna sebelum melanjutkan.

### Tahap 4. Implementasi Kode

Setelah memahami dokumentasi:

- Periksa kode terkait di `modules/auth/`.
- Periksa struktur komponen, types, utils, actions, dan business logic.
- Periksa `db/schema.prisma` jika fitur menggunakan database.
- Gunakan `app/` untuk routing dan integrasi halaman.

### Aturan Efisiensi Context dan Token

1. Baca dokumentasi secara bertahap dari umum ke khusus.
2. Prioritaskan file yang berkaitan langsung dengan tugas.
3. Jangan membaca seluruh codebase jika tidak diperlukan.
4. Jangan mengulang pembacaan dokumen yang sudah dipahami dalam konteks pengerjaan yang sama.
5. Jangan mengabaikan dokumen wajib hanya demi menghemat token.
6. Jika dokumentasi saling bertentangan atau tidak lengkap, laporkan kepada pengguna sebelum mengambil keputusan.

---

## 6. Standar Dokumentasi Fitur

Seluruh dokumentasi fitur SCOUT harus disimpan di dalam folder `product/auth/`, dan seluruh kode implementasinya berada di `modules/auth/`.

Gunakan format penamaan dokumentasi berikut di dalam `product/auth/`:

| Kode | Jenis Dokumentasi | Contoh |
|---|---|---|
| US | User Story | `user-stories-us-01.md`, `user-stories-us-02.md` |
| UF | User Flow | `user-flow-us-01.md`, `user-flow-us-02.md` |
| WF | Wireframe | `wireframe-us-01.md`, `wireframe-us-24.md` |
| MO | Mockup | `mockup.png`, `US1-REGISTER.png` |
| DT | Data Structure | `database-us-01.md`, `database-us-02.md` |

Contoh isi dokumentasi di `product/auth/`:

```text
product/auth/
├── database-us-01.md
├── database-us-02.md
├── database-us-24.md
├── user-stories-us-01.md
├── user-stories-us-02.md
├── user-stories-us-14.md
├── user-stories-us-18.md
├── user-stories-us-24.md
├── user-flow-us-01.md
├── user-flow-us-02.md
├── wireframe-us-01.md
└── ...
```

Ketentuan:

- Seluruh dokumentasi fitur apapun (registrasi, login, profil, dashboard, landing page, terms, dsb.) wajib berada di `product/auth/`.
- Gunakan dokumen yang tersedia sebagai acuan implementasi.
- Jangan mengarang spesifikasi yang belum diberikan.
- Jika ada dokumen yang belum tersedia tetapi diperlukan, minta atau laporkan kepada pengguna.
- Jangan mengubah penamaan dokumen yang sudah ada tanpa memeriksa referensinya terlebih dahulu.

---

## 7. Alur Kerja Implementasi Fitur

Setiap permintaan pengembangan fitur harus mengikuti tahapan berikut.

### 7.1 Analisis Kebutuhan

- Identifikasi fitur dan ruang lingkup tugas.
- Pahami user story dan tujuan fitur.
- Identifikasi acceptance criteria.

### 7.2 Verifikasi Dokumentasi

- Ikuti urutan pembacaan pada Bagian 5.
- Periksa seluruh dokumentasi fitur yang relevan.
- Pahami alur, desain, struktur data, dan batasan implementasi.

### 7.3 Pemeriksaan Codebase

- Periksa struktur proyek.
- Periksa kode yang sudah tersedia.
- Periksa dependency dan konfigurasi.
- Hindari membuat komponen atau fungsi duplikat.

### 7.4 Rencana Implementasi

Sebelum coding, berikan rencana yang menjelaskan:

- Pendekatan implementasi.
- File yang akan dibuat.
- File yang akan diubah.
- Perubahan database jika diperlukan.
- Dependency tambahan jika diperlukan.
- Potensi risiko dan kendala.

### 7.5 Persetujuan Pengguna

- Tunggu persetujuan pengguna sebelum menulis atau mengubah kode.
- Jangan langsung melakukan implementasi sebelum memperoleh persetujuan.

### 7.6 Implementasi

- Letakkan seluruh kode fitur di `modules/auth/`.
- Letakkan komponen UI seluruh fitur di `modules/auth/components/`.
- Letakkan types dan interfaces seluruh fitur di `modules/auth/types/`.
- Letakkan business logic dan utils di `modules/auth/utils/`.
- Letakkan server actions di `modules/auth/actions.ts`.
- Ekspor seluruh komponen dan actions di `modules/auth/index.ts`.
- Gunakan `shared/` hanya untuk komponen utilitas umum yang benar-benar independen (seperti Navbar dan Footer).
- Gunakan `app/` untuk routing dan integrasi halaman.
- Perbarui `db/schema.prisma` jika membutuhkan perubahan database.
- Kerjakan satu fitur atau satu perubahan dalam satu prompt.

### 7.7 Verifikasi dan Pengujian

- Jalankan pengujian yang relevan.
- Pastikan seluruh acceptance criteria terpenuhi.
- Periksa error TypeScript dan broken imports.
- Jalankan `npm run build`.
- Periksa hasil implementasi melalui browser jika melibatkan UI.
- Laporkan hasil pengujian dan masalah yang masih tersisa.

---

## 8. Aturan Interaksi dan Pengembangan

1. Minta rencana implementasi terlebih dahulu sebelum coding.
2. Tunggu persetujuan pengguna sebelum melakukan perubahan.
3. Satu prompt berfokus pada satu fitur atau satu perubahan.
4. Jangan memperluas ruang lingkup tanpa persetujuan pengguna.
5. Jangan menghapus kode atau konfigurasi yang masih digunakan tanpa alasan teknis yang jelas.
6. Jika dokumentasi tidak lengkap atau bertentangan, tanyakan kepada pengguna.
7. Catat prompt, hasil, dan evaluasi di `project/prompt-log.md`.
8. Jangan mengklaim fitur berhasil sebelum menjalankan pengujian.
9. Laporkan file yang dibuat atau diubah setelah implementasi.

---

## 9. Aturan Git dan Pengelolaan Kredensial

- Pastikan `.env` dan `.env.local` tercantum dalam `.gitignore`.
- Jangan melakukan commit API key, password, token, atau kredensial.
- Periksa perubahan sebelum melakukan commit.
- Gunakan pesan commit yang menjelaskan perubahan secara singkat.
- Jangan melakukan push atau mengubah repository remote tanpa instruksi pengguna.
- Jangan menghapus atau mengubah riwayat Git tanpa persetujuan pengguna.

---

## 10. Prinsip Utama Pengembangan SCOUT

1. Dokumentasi produk menjadi sumber acuan utama implementasi.
2. Seluruh dokumentasi terpusat di `product/auth/` dan seluruh implementasi kode terpusat di `modules/auth/`.
3. Ikuti user story, user flow, wireframe, mockup, dan struktur data.
4. Gunakan pendekatan schema-first untuk perubahan database.
5. Gunakan satu `db/schema.prisma` untuk seluruh fitur.
6. Prioritaskan keamanan dan privasi data pengguna.
7. Pertahankan konsistensi UI/UX dan identitas visual SCOUT.
8. Hindari kompleksitas serta dependency yang tidak diperlukan.
9. Pastikan setiap perubahan dapat diuji dan diverifikasi.