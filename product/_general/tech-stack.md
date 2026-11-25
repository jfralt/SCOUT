# Tech Stack & Standar Pengembangan - SCOUT

Dokumen spesifikasi teknologi, arsitektur modular, dan aturan rekayasa perangkat lunak proyek SCOUT.

---

## 1. Stack Teknologi Utama

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Runtime** | Node.js (LTS) | Lingkungan eksekusi server-side |
| **Framework** | Next.js (App Router) | Full-stack React framework (SSR, SSG, Route Handlers) |
| **Bahasa** | TypeScript | Strict typing untuk keandalan kode dan pencegahan bug |
| **Database Lokal** | SQLite | Basis data relasional file-based untuk pengembangan lokal |
| **Database Server** | PostgreSQL (Supabase) | Database production yang digunakan pada server Vercel |
| **ORM** | Prisma | Object-Relational Mapping dengan pendekatan schema-first |
| **Autentikasi** | JWT (JSON Web Token) | Autentikasi stateless untuk otorisasi sesi pengguna |
| **Styling** | Tailwind CSS | Utility-first CSS dengan identitas visual SCOUT |
| **Validasi Skema** | Zod | Validasi tipe-aman untuk form input dan request API |
| **Testing** | Vitest | Framework unit test dan integrasi |
| **Linter & Formatter** | ESLint + Prettier | Penegakan standar gaya kode dan deteksi kesalahan |
| **Manajemen Rahasia** | `.env` | Penyimpanan variabel lingkungan seperti `DATABASE_URL` dan `JWT_SECRET` |

---

## 2. Aturan Arsitektur Modular

Struktur proyek bersifat **modular berbasis fitur**.

```text
modules/<fitur>/  <===>  product/<fitur>/
```

### Prinsip Arsitektur

- **Prinsip Simetri:** Setiap folder fitur di `modules/<fitur>/` wajib memiliki padanan dokumentasi di `product/<fitur>/`.
- **Contoh:**
  - `product/landing-page/` berpasangan dengan `modules/landing-page/`.
  - `product/auth/` berpasangan dengan `modules/auth/`.
- **Rute Tipis (Thin Routes):** Direktori `app/` hanya menangani routing Next.js seperti `page.tsx` dan `layout.tsx`. Seluruh business logic, komponen UI spesifik, dan aksi form berada di dalam `modules/<fitur>/`.
- **Komponen Bersama:** Komponen dan fungsi utilitas yang benar-benar digunakan lintas modul ditempatkan di `shared/`.

---

## 3. Desain Basis Data (Prisma & Schema-First)

### 3.1 Konfigurasi Database

- **Database lokal:** SQLite.
- **Database server:** PostgreSQL melalui Supabase.
- **ORM:** Prisma.
- **Pendekatan:** Schema-first.
- **Lokasi schema:** `db/schema.prisma`.
- **Jumlah schema:** Satu file `db/schema.prisma` untuk SEMUA fitur.
- **URL koneksi:** Seluruh koneksi database menggunakan environment variable `DATABASE_URL`.

### 3.2 Aturan Perancangan Schema

1. Baca seluruh dokumen Data Structure (`dt*.md`) yang relevan di folder `product/` sebelum mengubah schema.
2. Tentukan tabel dan relasi berdasarkan kebutuhan data seluruh fitur.
3. Lakukan normalisasi untuk menghindari duplikasi data.
4. Tentukan primary key dan foreign key dengan tepat.
5. Tambahkan kolom teknis yang diperlukan, seperti `passwordHash`, `createdAt`, dan `updatedAt`.
6. Kelompokkan model berdasarkan domain fitur dalam satu file `db/schema.prisma`.
7. Jangan membuat schema Prisma terpisah untuk setiap fitur.

### 3.3 Contoh Konfigurasi Prisma

Contoh berikut menggambarkan konfigurasi database lokal menggunakan SQLite.

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// Model Fitur: Autentikasi dan Akun Pengguna
model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  role         String   @default("UKM")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

// Model Fitur: Document Tracking
model Document {
  id        String   @id @default(uuid())
  userId    String
  category  String
  title     String
  filePath  String
  status    String   @default("PENDING")
  version   Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// Model Fitur: Document Assessment
model Assessment {
  id             String   @id @default(uuid())
  documentId     String
  readinessScore Int
  findings       String
  isPassed       Boolean  @default(false)
  reviewedAt     DateTime @default(now())
}

// Model Fitur: Platform Matchmaking
model ScfPlatform {
  id               String  @id @default(uuid())
  name             String  @unique
  instrumentTypes  String
  supportedSectors String
  minFunding       Float
  maxFunding       Float
  isActive         Boolean @default(true)
}
```

Contoh model di atas merupakan ilustrasi awal. Agent wajib menyesuaikan model, relasi, dan normalisasi berdasarkan seluruh dokumentasi Data Structure yang tersedia.

### 3.4 Aturan Migrasi Database

Setiap perubahan schema mengikuti urutan berikut:

1. Perbarui `db/schema.prisma`.
2. Periksa konsistensi model dan relasi.
3. Jalankan migrasi menggunakan:

```bash
npx prisma migrate dev --name <deskripsi-singkat>
```

4. Periksa hasil migrasi.
5. Laporkan tabel dan relasi yang dibuat atau diubah.

Ketentuan tambahan:

- Jangan mengedit atau menghapus file migrasi yang sudah dijalankan.
- Jangan mengubah tabel yang digunakan fitur lain tanpa alasan teknis yang jelas.
- Jika perubahan provider database diperlukan, ubah provider pada schema, sesuaikan koneksi, lalu buat ulang migrasi sesuai lingkungan database.
- Jangan menjalankan migrasi production tanpa persetujuan pengguna.

---

## 4. Standar Autentikasi dan Otorisasi (JWT)

- **Mekanisme:** JWT ditandatangani menggunakan kunci rahasia `JWT_SECRET` yang disimpan di `.env`.
- **Penyimpanan Token:** Token disimpan dalam HTTP-only secure cookie untuk mengurangi risiko pencurian token melalui XSS.
- **Middleware Proteksi:** Pemeriksaan autentikasi dilakukan pada setiap rute yang membutuhkan akses pengguna, seperti `/dashboard`, `/tracker`, dan `/assessment`.
- **Password:** Password pengguna wajib di-hash menggunakan bcrypt sebelum disimpan ke database.
- **Otorisasi:** Setiap pengguna hanya dapat mengakses data yang menjadi haknya.

---

## 5. Konfigurasi Lingkungan (.env)

Seluruh kredensial dan konfigurasi sensitif dilarang di-hardcode ke repositori.

### Database Lokal (SQLite)

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="ganti_dengan_kunci_rahasia_acak_minimal_32_karakter"
JWT_EXPIRES_IN="7d"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### Database Server (PostgreSQL Supabase)

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="gunakan_kunci_rahasia_acak"
JWT_EXPIRES_IN="7d"
NEXT_PUBLIC_APP_URL="https://domain-aplikasi.com"
NODE_ENV="production"
```

Ketentuan:

- Gunakan `DATABASE_URL` sebagai satu-satunya variabel koneksi database.
- Nilai koneksi harus disesuaikan dengan lingkungan database yang digunakan.
- Jangan menyimpan kredensial asli dalam dokumentasi atau repository.
- File `.env` dan `.env.local` harus tercantum dalam `.gitignore`.
- Jangan pernah mengunggah rahasia atau kredensial ke GitHub.

---

## 6. Standar Kualitas dan Pengujian Kode

### 6.1 Validasi Skema (Zod)

Setiap request body pada API dan data form wajib divalidasi menggunakan skema Zod sebelum diproses atau disimpan ke database.

### 6.2 Testing (Vitest)

- Unit test untuk formula kalkulasi, seperti SCF Readiness Score.
- Unit test untuk business logic setiap fitur.
- Jalankan pengujian menggunakan:

```bash
npm run test
```

atau:

```bash
npx vitest run
```

### 6.3 Format dan Linting

- Kode wajib lolos linting ESLint menggunakan `npm run lint`.
- Kode harus diformat secara konsisten menggunakan Prettier sebelum commit.
- Pastikan tidak ada error TypeScript atau broken imports sebelum menyelesaikan implementasi.