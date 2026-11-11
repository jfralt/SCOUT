<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Panduan Kerja Agen AI (AGENTS.md) - SCOUT

Dokumen ini adalah instruksi kerja dan aturan baku bagi seluruh agen AI / asisten pengkodean yang bekerja pada proyek ini.

---

## 1. Gambaran Proyek

**SCOUT** adalah platform pendamping dan akselerator UKM di Indonesia yang ingin melakukan penggalangan dana publik melalui skema **Securities Crowdfunding (SCF)** sesuai regulasi OJK (POJK No. 57/POJK.04/2020).

### Tiga Fitur Utama SCOUT:
1. **Document Tracking:** Dasbor pemantauan siklus hidup dan kelengkapan berkas administratif, legalitas (NIB, Akta PT), dan keuangan secara terpusat.
2. **Document Assessment:** Mesin diagnosa dan evaluasi kelayakan berkas yang menghasilkan *SCF Readiness Score* (0 - 100) serta panduan revisi konkret sebelum kurasi resmi.
3. **Platform Matchmaking:** Algoritma pencocokan profil UKM (sektor, nominal target dana, instrumen saham vs sukuk) dengan platform penyelenggara SCF berizin OJK.

---

## 2. Aturan Emas (Golden Rules)

> [!IMPORTANT]
> 1. **Satu Fitur = Satu Pasang Folder:** Setiap fitur yang ada di `modules/<fitur>/` **WAJIB** memiliki padanan dokumentasi di `product/<fitur>/` dengan nama yang sama persis.
> 2. **BACA `product/` DULU SEBELUM KODING:** Sebelum menulis atau memodifikasi kode di `modules/<fitur>/`, agen AI **wajib membaca dan mematuhi** dokumen spesifikasi, user story, dan kriteria penerimaan yang ada di `product/<fitur>/` serta `product/_general/`.
> 3. **Bedakan Fakta, Asumsi, dan Rencana:** Dilarang mengarang hasil riset atau wawancara fiktif dalam dokumentasi.

---

## 3. Struktur Direktori Proyek

```
├── app/        # Rute halaman (TIPIS / Thin Routes). Hanya routing, layout, dan metadata.
├── modules/    # Kode implementasi per fitur (komponen, logic, types, utils).
├── product/    # Dokumentasi spesifikasi per fitur (PRD, user story, flow, wireframe).
├── shared/     # Komponen UI dan fungsi utilitas bersama lintas fitur (Navbar, Footer, formatters).
├── db/         # Skema data, Prisma models, migrasi, dan seed.
├── project/    # Catatan proses pengembangan, log arsitektur, dan ADR.
└── AGENTS.md   # Aturan kerja agen AI (berkas ini).
```

### Detail Peran Folder:
- **`app/` (Thin Routes):** Dilarang keras menaruh kalkulasi rumit, manipulasi form besar, atau state bisnis di `app/page.tsx`. Rute hanya mengimpor kontainer fitur dari `modules/`.
- **`modules/<fitur>/`:** Menyimpan seluruh kode implementasi milik fitur bersangkutan:
  - `components/`: Komponen UI lokal fitur.
  - `types/`: Deklarasi antarmuka TypeScript lokal.
  - `utils/`: Logika dan formula perhitungan lokal.
  - `index.ts`: Titik ekspor modul.
- **`product/<fitur>/`:** Berisi seluruh spesifikasi produk fitur tersebut (`user-story-*.md`, `user-flow-*.md`, `wireframe-*.md`, `mockup.png`).
- **`shared/`:** Menyimpan aset universal yang benar-benar dipakai bersama oleh $\ge 2$ fitur.
- **`db/`:** Skema database per fitur yang dipetakan ke SQLite via Prisma ORM.

---

## 4. Standar Teknologi & Aturan Coding

1. **Stack Inti:**
   - **Framework:** Next.js (App Router, Turbopack) & React.
   - **Bahasa:** TypeScript (Strict Mode). Dilarang memakai tipe `any`.
   - **Database:** SQLite berbasis file (`dev.db`).
   - **ORM:** Prisma (`provider = "sqlite"`), skema model dikelompokkan per fitur.
   - **Autentikasi:** JSON Web Token (JWT) disimpan dalam *HTTP-only cookie*.
   - **Styling:** Tailwind CSS dengan palet tema **Kuning dan Hitam** (*Scout Gold* `#FACC15` & *Obsidian Black* `#050505`).
   - **Validasi:** Seluruh payload API dan data form wajib divalidasi dengan **Zod**.
   - **Testing:** Unit test formula dan alur logika menggunakan **Vitest**.
   - **Rahasia & Kredensial:** Disimpan dalam `.env` / `.env.local`, dilarang keras di-hardcode.

2. **Gaya Bahasa Copywriting:**
   - Gunakan Bahasa Indonesia formal, komunikatif, profesional, dan mudah dipahami pelaku UKM.
   - Tombol aksi utama (*Call-to-Action*) harus selalu kontras, mencolok (kuning), dan berlabel jelas (contoh: *"Mulai"* atau *"Mulai Konsultasi"*).

---

## 5. Alur Kerja Agen AI (Workflow)

Saat menerima tugas baru dari pengguna:
```
1. Analisis Kebutuhan
   └── Identifikasi domain fitur yang diminta pengguna.

2. Verifikasi Dokumentasi (Wajib)
   └── Buka dan baca berkas di product/<fitur>/ dan product/_general/.
   └── Pahami batasan ruang lingkup, model data, dan user story.

3. Implementasi Kode di modules/<fitur>/
   └── Tulis types/interfaces terlebih dahulu di modules/<fitur>/types/.
   └── Tulis fungsi utilitas/kalkulasi di modules/<fitur>/utils/.
   └── Tulis komponen UI interaktif di modules/<fitur>/components/.

4. Penyambungan Rute di app/
   └── Jika butuh rute halaman baru, buat app/<rute>/page.tsx secara tipis.
   └── Ekspor modul melalui modules/<fitur>/index.ts.

5. Verifikasi & Pengujian
   └── Jalankan build `npm run build` untuk memastikan 0 error kompilasi TypeScript.
   └── Pastikan tidak ada broken import.
```
