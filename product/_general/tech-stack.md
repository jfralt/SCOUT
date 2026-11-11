# Tech Stack & Standar Pengembangan - SCOUT

Dokumen spesifikasi teknologi, arsitektur modular, dan aturan rekayasa perangkat lunak proyek SCOUT.

---

## 1. Stack Teknologi Utama

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Runtime** | Node.js (LTS) | Lingkungan eksekusi server-side |
| **Framework** | Next.js (App Router) | Full-stack React framework (SSR, SSG, Route Handlers) |
| **Bahasa** | TypeScript | Strict typing untuk keandalan kode dan pencegahan bug |
| **Database** | SQLite | Basis data relasional file-based yang cepat dan mudah diuji |
| **ORM** | Prisma | Object-Relational Mapping tipe-aman (`provider = "sqlite"`) |
| **Autentikasi** | JWT (JSON Web Token) | Autentikasi stateless untuk otorisasi sesi pengguna |
| **Styling** | Tailwind CSS | Utility-first CSS dengan palet tema Kuning & Hitam |
| **Validasi Skema** | Zod | Validasi tipe-aman untuk form input pengguna dan request API |
| **Testing** | Vitest | Framework unit test dan integrasi berkecepatan tinggi |
| **Linter & Formatter**| ESLint + Prettier | Penegakan standar gaya kode dan deteksi dini kesalahan |
| **Manajemen Rahasia**| `.env` (`.env.local`) | Variabel lingkungan (`DATABASE_URL`, `JWT_SECRET`, dll.) |

---

## 2. Aturan Arsitektur Modular

Struktur proyek bersifat **modular berbasis fitur**:
```
modules/<fitur>/   <===>   product/<fitur>/
```
- **Prinsip Simetri:** Setiap folder fitur di `modules/<x>` wajib memiliki padanan dokumentasi di `product/<x>`.
- **Contoh:**
  - `product/_general/` $\leftrightarrow$ `modules/_general/`
  - `product/landing-page/` $\leftrightarrow$ `modules/landing-page/`
- **Rute Tipis (*Thin Routes*):** Direktori `app/` hanya menangani routing Next.js (`page.tsx`, `layout.tsx`). Seluruh logika bisnis, komponen UI spesifik, dan aksi form berada di dalam `modules/<fitur>`.
- **Komponen Bersama:** Komponen dan fungsi utilitas yang benar-benar digunakan lintas modul ditempatkan di `shared/`.

---

## 3. Desain Basis Data (Prisma & SQLite)

- **Provider:** SQLite (`prisma/schema.prisma`).
- **Skema per Fitur:** Model tabel dikelompokkan per domain fitur di dalam `schema.prisma`.
- **Contoh Konfigurasi:**
  ```prisma
  datasource db {
    provider = "sqlite"
    url      = env("DATABASE_URL") // Contoh: "file:./dev.db"
  }

  generator client {
    provider = "prisma-client-js"
  }

  // Model Fitur: Autentikasi & Akun Pengguna
  model User {
    id        String   @id @default(uuid())
    email     String   @unique
    password  String
    role      String   @default("UKM") // UKM | ADMIN | REVIEWER
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }

  // Model Fitur: Document Tracking
  model Document {
    id          String   @id @default(uuid())
    userId      String
    category    String   // LEGALITAS | KEUANGAN | PROSPEKTUS
    title       String
    filePath    String
    status      String   @default("PENDING") // PENDING | IN_REVIEW | APPROVED | REVISION
    version     Int      @default(1)
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt
  }

  // Model Fitur: Document Assessment
  model Assessment {
    id              String   @id @default(uuid())
    documentId      String
    readinessScore  Int      // 0 - 100
    findings        String   // JSON string / rekomendasi perbaikan
    isPassed        Boolean  @default(false)
    reviewedAt      DateTime @default(now())
  }

  // Model Fitur: Platform Matchmaking
  model ScfPlatform {
    id              String   @id @default(uuid())
    name            String   @unique // Bizhare, Santara, LandX, Shafiq, dll.
    instrumentTypes String   // SAHAM, SUKUK, OBLIGASI
    supportedSectors String  // FNB, RETAIL, MANUFACTURE, dll.
    minFunding      Float
    maxFunding      Float
    isActive        Boolean  @default(true)
  }
  ```

---

## 4. Standar Autentikasi & Otorisasi (JWT)

- **Mekanisme:** JWT ditandatangani menggunakan kunci rahasia `JWT_SECRET` yang disimpan di `.env`.
- **Penyimpanan Token:** Disimpan dalam *HTTP-only secure cookie* untuk mencegah serangan XSS.
- **Middleware Proteksi:** Next.js Middleware memeriksa validitas JWT pada setiap rute yang membutuhkan otentikasi (seperti `/dashboard`, `/tracker`, `/assessment`).

---

## 5. Konfigurasi Lingkungan (`.env`)

Seluruh kredensial dan konfigurasi sensitif dilarang di-hardcode ke repositori:
```env
# Database
DATABASE_URL="file:./dev.db"

# Autentikasi
JWT_SECRET="ganti_dengan_kunci_rahasia_acak_minimal_32_karakter"
JWT_EXPIRES_IN="7d"

# Aplikasi
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## 6. Standar Kualitas & Pengujian Kode

1. **Validasi Skema (Zod):** Setiap request body pada API dan data form wajib divalidasi dengan skema Zod sebelum diproses atau disimpan ke database.
2. **Testing (Vitest):**
   - Unit test untuk formula kalkulasi (misal: skor asesmen dan kalkulator kelayakan).
   - Jalankan pengujian dengan perintah `npm run test` atau `npx vitest run`.
3. **Format & Linting:**
   - Wajib lolos linting ESLint (`npm run lint`).
   - Kode diformat rapi dengan Prettier sebelum di-commit.
