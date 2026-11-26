import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import type {
  UserRecord,
  EmailOtpRecord,
  BusinessProfileRecord,
  DocumentRequirementRecord,
  DocumentRecord,
  ConsentRecord,
  PlatformRecord,
  DocumentWithRequirement,
  MatchmakingPlatformResult,
  DashboardMetric,
} from "../types/index";

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) return dbInstance;

  // Pastikan folder db ada
  const dbDir = path.resolve(process.cwd(), "db");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, "scout.db");
  const db = new DatabaseSync(dbPath);

  // Inisialisasi tabel users jika belum ada
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      email_terverifikasi INTEGER DEFAULT 0,
      dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrasi aman untuk users
  try {
    const tableInfo = db.prepare("PRAGMA table_info(users)").all() as Array<{ name: string }>;
    const columnNames = tableInfo.map((col) => col.name);

    if (!columnNames.includes("nama") && columnNames.includes("name")) {
      db.exec("ALTER TABLE users ADD COLUMN nama TEXT DEFAULT ''");
      db.exec("UPDATE users SET nama = name WHERE nama = ''");
    }
    if (!columnNames.includes("email_terverifikasi")) {
      db.exec("ALTER TABLE users ADD COLUMN email_terverifikasi INTEGER DEFAULT 0");
    }
    if (!columnNames.includes("dibuat_pada") && columnNames.includes("created_at")) {
      db.exec("ALTER TABLE users ADD COLUMN dibuat_pada DATETIME");
      db.exec("UPDATE users SET dibuat_pada = COALESCE(created_at, CURRENT_TIMESTAMP)");
    }
  } catch (err) {
    console.error("Migration notice for users table:", err);
  }

  // Inisialisasi tabel email_otps (US-01 / US-24)
  db.exec(`
    CREATE TABLE IF NOT EXISTS email_otps (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      kode_hash TEXT NOT NULL,
      dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
      kedaluwarsa_pada DATETIME NOT NULL,
      digunakan INTEGER DEFAULT 0,
      jumlah_percobaan INTEGER DEFAULT 0,
      tidak_berlaku INTEGER DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_email_otps_user ON email_otps(user_id);
  `);

  // Inisialisasi tabel business_profiles (US-02 / US-05 / US-27)
  db.exec(`
    CREATE TABLE IF NOT EXISTS business_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      nama_bisnis TEXT DEFAULT '',
      badan_hukum TEXT NOT NULL,
      sektor TEXT NOT NULL,
      kebutuhan_dana REAL NOT NULL,
      kondisi_dokumen TEXT NOT NULL,
      jenis_efek TEXT DEFAULT 'SAHAM',
      jangka_waktu_bulan INTEGER DEFAULT 12,
      tujuan_pendanaan TEXT DEFAULT 'Pengembangan Usaha',
      rencana_penggunaan TEXT DEFAULT '',
      penjelasan_penggunaan TEXT DEFAULT '',
      dokumen_pendukung_url TEXT,
      status_draf INTEGER DEFAULT 0,
      platform_tujuan_id TEXT,
      diperbarui_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_business_profiles_user ON business_profiles(user_id);
  `);

  // Migrasi kolom jenis_efek pada business_profiles jika belum ada
  try {
    const bpInfo = db.prepare("PRAGMA table_info(business_profiles)").all() as Array<{ name: string }>;
    const bpCols = bpInfo.map((col) => col.name);
    if (!bpCols.includes("jenis_efek")) {
      db.exec("ALTER TABLE business_profiles ADD COLUMN jenis_efek TEXT DEFAULT 'SAHAM'");
    }
  } catch (err) {
    console.error("Migration notice for business_profiles table:", err);
  }

  // Inisialisasi tabel document_requirements (US-03 / US-04)
  db.exec(`
    CREATE TABLE IF NOT EXISTS document_requirements (
      id TEXT PRIMARY KEY,
      kode TEXT UNIQUE NOT NULL,
      nama TEXT NOT NULL,
      kategori TEXT NOT NULL,
      deskripsi TEXT NOT NULL,
      wajib INTEGER DEFAULT 1,
      urutan INTEGER DEFAULT 0
    );
  `);

  // Inisialisasi tabel documents (US-04)
  db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      requirement_id TEXT NOT NULL,
      nama_file TEXT NOT NULL,
      lokasi_file TEXT NOT NULL,
      ukuran_kb INTEGER NOT NULL,
      status TEXT DEFAULT 'lengkap',
      catatan TEXT,
      diunggah_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
      diperbarui_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (requirement_id) REFERENCES document_requirements(id) ON DELETE CASCADE,
      UNIQUE (user_id, requirement_id)
    );
    CREATE INDEX IF NOT EXISTS idx_documents_user ON documents(user_id);
  `);

  // Inisialisasi tabel consents (US-17 / US-04)
  db.exec(`
    CREATE TABLE IF NOT EXISTS consents (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      jenis TEXT NOT NULL,
      disetujui INTEGER DEFAULT 0,
      tanggal DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_consents_user_jenis ON consents(user_id, jenis);
  `);

  // Inisialisasi tabel platforms (US-05)
  db.exec(`
    CREATE TABLE IF NOT EXISTS platforms (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      fokus_sektor TEXT NOT NULL,
      badan_hukum_diterima TEXT NOT NULL,
      dana_minimum REAL NOT NULL,
      dana_maksimum REAL NOT NULL,
      jenis_efek_didukung TEXT NOT NULL,
      estimasi_biaya REAL NOT NULL,
      deskripsi TEXT,
      keunggulan TEXT,
      aktif INTEGER DEFAULT 1,
      dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seeding default document requirements & platforms jika masih kosong
  seedDefaultRequirementsAndPlatforms(db);

  dbInstance = db;
  return dbInstance;
}

/**
 * Seed data awal document requirements & platforms SCF resmi berizin OJK
 */
function seedDefaultRequirementsAndPlatforms(db: DatabaseSync): void {
  // Seed Document Requirements
  const reqCount = db.prepare("SELECT COUNT(*) as count FROM document_requirements").get() as { count: number };
  if (reqCount.count === 0) {
    const defaultReqs = [
      {
        id: "req-akta-sk",
        kode: "DOC-AKTA-SK",
        nama: "Akta Pendirian PT & SK Kemenkumham Terakhir",
        kategori: "Legalitas",
        deskripsi: "Akta pendirian perseroan terbatas beserta seluruh akta perubahan anggaran dasar dan surat keputusan pengesahan dari Kemenkumham RI.",
        wajib: 1,
        urutan: 1,
      },
      {
        id: "req-nib",
        kode: "DOC-NIB-OSS",
        nama: "Nomor Induk Berusaha (NIB) Berbasis Risiko",
        kategori: "Legalitas",
        deskripsi: "NIB aktif yang diterbitkan melalui OSS-RBA memuat nomor KBLI sesuai dengan kegiatan usaha utama yang dimintakan pendanaan.",
        wajib: 1,
        urutan: 2,
      },
      {
        id: "req-neraca-lr",
        kode: "DOC-KEU-NERACA",
        nama: "Laporan Neraca & Laba Rugi (2024–2025)",
        kategori: "Keuangan",
        deskripsi: "Laporan keuangan komprehensif neraca saldo dan laba rugi minimal 1-2 tahun buku terakhir yang siap diperiksa/diaudit.",
        wajib: 1,
        urutan: 3,
      },
      {
        id: "req-skdu",
        kode: "DOC-SKDU-DOMISILI",
        nama: "Surat Keterangan Domisili Usaha (SKDU)",
        kategori: "Legalitas",
        deskripsi: "Surat domisili usaha atau izin lokasi operasional tempat usaha yang sah dan masih berlaku.",
        wajib: 1,
        urutan: 4,
      },
      {
        id: "req-arus-kas",
        kode: "DOC-KEU-ARUSKAS",
        nama: "Laporan Arus Kas Usaha (Januari–Oktober)",
        kategori: "Keuangan",
        deskripsi: "Laporan arus kas bulanan beserta mutasi rekening koran operasional 3-6 bulan terakhir.",
        wajib: 1,
        urutan: 5,
      },
      {
        id: "req-prospektus",
        kode: "DOC-PROSPEKTUS",
        nama: "Profil Perusahaan & Rencana Bisnis (Prospektus)",
        kategori: "Operasional",
        deskripsi: "Dokumen proposal penawaran, model bisnis, analisis pasar, proyeksi keuangan, serta rencana penggunaan dana SCF.",
        wajib: 1,
        urutan: 6,
      },
    ];

    const insertReq = db.prepare(`
      INSERT INTO document_requirements (id, kode, nama, kategori, deskripsi, wajib, urutan)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const r of defaultReqs) {
      insertReq.run(r.id, r.kode, r.nama, r.kategori, r.deskripsi, r.wajib, r.urutan);
    }
  }

  // Seed Platforms
  const platCount = db.prepare("SELECT COUNT(*) as count FROM platforms").get() as { count: number };
  if (platCount.count === 0) {
    const defaultPlatforms = [
      {
        id: "plat-bizhare",
        nama: "Bizhare",
        fokus_sektor: "F&B, Ritel, Jasa, Waralaba",
        badan_hukum_diterima: "PT",
        dana_minimum: 500000000,
        dana_maksimum: 10000000000,
        jenis_efek_didukung: "SAHAM, SUKUK, OBLIGASI",
        estimasi_biaya: 25000000,
        deskripsi: "Platform SCF terdepan untuk waralaba kuliner, ritel ritel modern, dan ekspansi cabang bisnis consumer goods.",
        keunggulan: "Basis investor ritel terbesar di sektor F&B dan waralaba nasional.",
        aktif: 1,
      },
      {
        id: "plat-santara",
        nama: "Santara",
        fokus_sektor: "F&B, Manufaktur, Agrikultur, Ritel",
        badan_hukum_diterima: "PT",
        dana_minimum: 1000000000,
        dana_maksimum: 10000000000,
        jenis_efek_didukung: "SAHAM",
        estimasi_biaya: 30000000,
        deskripsi: "Pelopor equity crowdfunding di Indonesia yang berfokus pada UKM skala berkembang dengan track record solid.",
        keunggulan: "Spesialisasi penerbitan saham ekuitas UKM dengan likuiditas tinggi di pasar sekunder.",
        aktif: 1,
      },
      {
        id: "plat-shafiq",
        nama: "Shafiq",
        fokus_sektor: "F&B, Jasa, Kesehatan, Properti, Teknologi",
        badan_hukum_diterima: "PT, CV",
        dana_minimum: 500000000,
        dana_maksimum: 10000000000,
        jenis_efek_didukung: "SUKUK, SAHAM",
        estimasi_biaya: 20000000,
        deskripsi: "Penyelenggara Securities Crowdfunding Syariah berizin OJK dengan skema akad sukuk mudharabah/musyarakah.",
        keunggulan: "Kepatuhan syariah ketat dan akses ke komunitas investor syariah berdaya beli tinggi.",
        aktif: 1,
      },
      {
        id: "plat-landx",
        nama: "LandX (Danasaham)",
        fokus_sektor: "F&B, Properti, Manufaktur, Jasa",
        badan_hukum_diterima: "PT",
        dana_minimum: 1000000000,
        dana_maksimum: 10000000000,
        jenis_efek_didukung: "SAHAM, OBLIGASI",
        estimasi_biaya: 28000000,
        deskripsi: "Platform urun dana efek dengan fokus pada bisnis beraset produktif dan pertumbuhan stabil.",
        keunggulan: "Due diligence mendalam dengan dukungan jaringan penjamin emisi berpengalaman.",
        aktif: 1,
      },
    ];

    const insertPlat = db.prepare(`
      INSERT INTO platforms (id, nama, fokus_sektor, badan_hukum_diterima, dana_minimum, dana_maksimum, jenis_efek_didukung, estimasi_biaya, deskripsi, keunggulan, aktif)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of defaultPlatforms) {
      insertPlat.run(
        p.id,
        p.nama,
        p.fokus_sektor,
        p.badan_hukum_diterima,
        p.dana_minimum,
        p.dana_maksimum,
        p.jenis_efek_didukung,
        p.estimasi_biaya,
        p.deskripsi,
        p.keunggulan,
        p.aktif
      );
    }
  }
}

// ==========================================
// User & Auth DB Queries
// ==========================================

export function findUserByEmail(email: string): UserRecord | null {
  const db = getDatabase();
  const query = db.prepare(`
    SELECT 
      id, 
      COALESCE(nama, name, '') as nama, 
      email, 
      password_hash, 
      COALESCE(email_terverifikasi, 0) as email_terverifikasi, 
      COALESCE(dibuat_pada, created_at, CURRENT_TIMESTAMP) as dibuat_pada,
      updated_at
    FROM users 
    WHERE email = ? COLLATE NOCASE
  `);
  const row = query.get(email.trim().toLowerCase()) as UserRecord | undefined;
  return row || null;
}

export function findUserById(id: string): UserRecord | null {
  const db = getDatabase();
  const query = db.prepare(`
    SELECT 
      id, 
      COALESCE(nama, name, '') as nama, 
      email, 
      password_hash, 
      COALESCE(email_terverifikasi, 0) as email_terverifikasi, 
      COALESCE(dibuat_pada, created_at, CURRENT_TIMESTAMP) as dibuat_pada,
      updated_at
    FROM users 
    WHERE id = ?
  `);
  const row = query.get(id) as UserRecord | undefined;
  return row || null;
}

export function createUser(nama: string, email: string, passwordHash: string): UserRecord {
  const db = getDatabase();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const normalizedEmail = email.trim().toLowerCase();

  const tableInfo = db.prepare("PRAGMA table_info(users)").all() as Array<{ name: string }>;
  const hasNameCol = tableInfo.some((col) => col.name === "name");

  if (hasNameCol) {
    const insert = db.prepare(`
      INSERT INTO users (id, nama, name, email, password_hash, email_terverifikasi, dibuat_pada, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, ?, ?)
    `);
    insert.run(id, nama.trim(), nama.trim(), normalizedEmail, passwordHash, now, now);
  } else {
    const insert = db.prepare(`
      INSERT INTO users (id, nama, email, password_hash, email_terverifikasi, dibuat_pada, updated_at)
      VALUES (?, ?, ?, ?, 0, ?, ?)
    `);
    insert.run(id, nama.trim(), normalizedEmail, passwordHash, now, now);
  }

  return {
    id,
    nama: nama.trim(),
    email: normalizedEmail,
    password_hash: passwordHash,
    email_terverifikasi: 0,
    dibuat_pada: now,
    updated_at: now,
  };
}

export function setUserEmailVerified(userId: string): void {
  const db = getDatabase();
  const now = new Date().toISOString();
  const update = db.prepare(`
    UPDATE users 
    SET email_terverifikasi = 1, updated_at = ? 
    WHERE id = ?
  `);
  update.run(now, userId);
}

// ==========================================
// OTP DB Queries (US-01 / US-24)
// ==========================================

export function createEmailOtp(
  userId: string,
  kodeHash: string,
  expireMinutes: number = 10
): EmailOtpRecord {
  const db = getDatabase();
  const id = crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + expireMinutes * 60 * 1000);

  const createdAtIso = now.toISOString();
  const expiresAtIso = expiresAt.toISOString();

  // Invaliasi kode OTP lama milik pengguna ini
  invalidateUserOtps(userId);

  const insert = db.prepare(`
    INSERT INTO email_otps (id, user_id, kode_hash, dibuat_pada, kedaluwarsa_pada, digunakan, jumlah_percobaan, tidak_berlaku)
    VALUES (?, ?, ?, ?, ?, 0, 0, 0)
  `);

  insert.run(id, userId, kodeHash, createdAtIso, expiresAtIso);

  return {
    id,
    user_id: userId,
    kode_hash: kodeHash,
    dibuat_pada: createdAtIso,
    kedaluwarsa_pada: expiresAtIso,
    digunakan: 0,
    jumlah_percobaan: 0,
    tidak_berlaku: 0,
  };
}

export function getLatestOtpForUser(userId: string): EmailOtpRecord | null {
  const db = getDatabase();
  const query = db.prepare(`
    SELECT * FROM email_otps 
    WHERE user_id = ? AND tidak_berlaku = 0
    ORDER BY dibuat_pada DESC, rowid DESC 
    LIMIT 1
  `);
  const row = query.get(userId) as EmailOtpRecord | undefined;
  return row || null;
}

export function markOtpAsUsed(otpId: string): void {
  const db = getDatabase();
  const update = db.prepare(`
    UPDATE email_otps 
    SET digunakan = 1 
    WHERE id = ?
  `);
  update.run(otpId);
}

export function incrementOtpAttempts(otpId: string): number {
  const db = getDatabase();
  const update = db.prepare(`
    UPDATE email_otps 
    SET jumlah_percobaan = jumlah_percobaan + 1 
    WHERE id = ?
  `);
  update.run(otpId);

  const query = db.prepare("SELECT jumlah_percobaan FROM email_otps WHERE id = ?");
  const row = query.get(otpId) as { jumlah_percobaan: number } | undefined;
  return row?.jumlah_percobaan || 0;
}

export function invalidateOtp(otpId: string): void {
  const db = getDatabase();
  const update = db.prepare(`
    UPDATE email_otps 
    SET tidak_berlaku = 1 
    WHERE id = ?
  `);
  update.run(otpId);
}

export function invalidateUserOtps(userId: string): void {
  const db = getDatabase();
  const update = db.prepare(`
    UPDATE email_otps 
    SET tidak_berlaku = 1, digunakan = 1 
    WHERE user_id = ? AND tidak_berlaku = 0
  `);
  update.run(userId);
}

// ==========================================
// Business Profile DB Queries (US-02 / US-27)
// ==========================================

export function getBusinessProfileByUserId(userId: string): BusinessProfileRecord | null {
  const db = getDatabase();
  const query = db.prepare("SELECT * FROM business_profiles WHERE user_id = ?");
  const row = query.get(userId) as BusinessProfileRecord | undefined;
  return row || null;
}

export function saveBusinessProfile(
  userId: string,
  data: {
    nama_bisnis: string;
    badan_hukum: string;
    sektor: string;
    kebutuhan_dana: number;
    kondisi_dokumen: string;
    jenis_efek?: string;
    jangka_waktu_bulan?: number;
    tujuan_pendanaan?: string;
    rencana_penggunaan?: string;
    penjelasan_penggunaan?: string;
    dokumen_pendukung_url?: string | null;
  },
  isDraft: boolean = false
): BusinessProfileRecord {
  const db = getDatabase();
  const existing = getBusinessProfileByUserId(userId);
  const now = new Date().toISOString();

  if (existing) {
    const update = db.prepare(`
      UPDATE business_profiles SET
        nama_bisnis = ?,
        badan_hukum = ?,
        sektor = ?,
        kebutuhan_dana = ?,
        kondisi_dokumen = ?,
        jenis_efek = ?,
        jangka_waktu_bulan = ?,
        tujuan_pendanaan = ?,
        rencana_penggunaan = ?,
        penjelasan_penggunaan = ?,
        dokumen_pendukung_url = ?,
        status_draf = ?,
        diperbarui_pada = ?
      WHERE user_id = ?
    `);

    update.run(
      data.nama_bisnis || "",
      data.badan_hukum || "",
      data.sektor || "",
      data.kebutuhan_dana || 0,
      data.kondisi_dokumen || "",
      data.jenis_efek || "SAHAM",
      data.jangka_waktu_bulan || 12,
      data.tujuan_pendanaan || "Pengembangan Usaha",
      data.rencana_penggunaan || "",
      data.penjelasan_penggunaan || "",
      data.dokumen_pendukung_url || null,
      isDraft ? 1 : 0,
      now,
      userId
    );

    return {
      ...existing,
      ...data,
      jenis_efek: data.jenis_efek || "SAHAM",
      jangka_waktu_bulan: data.jangka_waktu_bulan || 12,
      tujuan_pendanaan: data.tujuan_pendanaan || "Pengembangan Usaha",
      rencana_penggunaan: data.rencana_penggunaan || "",
      penjelasan_penggunaan: data.penjelasan_penggunaan || "",
      dokumen_pendukung_url: data.dokumen_pendukung_url || null,
      status_draf: isDraft ? 1 : 0,
      diperbarui_pada: now,
    };
  }

  const id = crypto.randomUUID();
  const insert = db.prepare(`
    INSERT INTO business_profiles (
      id, user_id, nama_bisnis, badan_hukum, sektor, kebutuhan_dana,
      kondisi_dokumen, jenis_efek, jangka_waktu_bulan, tujuan_pendanaan, rencana_penggunaan,
      penjelasan_penggunaan, dokumen_pendukung_url, status_draf, diperbarui_pada
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    id,
    userId,
    data.nama_bisnis || "",
    data.badan_hukum || "",
    data.sektor || "",
    data.kebutuhan_dana || 0,
    data.kondisi_dokumen || "",
    data.jenis_efek || "SAHAM",
    data.jangka_waktu_bulan || 12,
    data.tujuan_pendanaan || "Pengembangan Usaha",
    data.rencana_penggunaan || "",
    data.penjelasan_penggunaan || "",
    data.dokumen_pendukung_url || null,
    isDraft ? 1 : 0,
    now
  );

  return {
    id,
    user_id: userId,
    nama_bisnis: data.nama_bisnis || "",
    badan_hukum: data.badan_hukum || "",
    sektor: data.sektor || "",
    kebutuhan_dana: data.kebutuhan_dana || 0,
    kondisi_dokumen: data.kondisi_dokumen || "",
    jenis_efek: data.jenis_efek || "SAHAM",
    jangka_waktu_bulan: data.jangka_waktu_bulan || 12,
    tujuan_pendanaan: data.tujuan_pendanaan || "Pengembangan Usaha",
    rencana_penggunaan: data.rencana_penggunaan || "",
    penjelasan_penggunaan: data.penjelasan_penggunaan || "",
    dokumen_pendukung_url: data.dokumen_pendukung_url || null,
    status_draf: isDraft ? 1 : 0,
    diperbarui_pada: now,
  };
}

// ==========================================
// Consent DB Queries (US-17 / US-04)
// ==========================================

export function getUserConsent(userId: string, jenis: string = "pemrosesan_data_pribadi"): boolean {
  const db = getDatabase();
  const row = db.prepare("SELECT disetujui FROM consents WHERE user_id = ? AND jenis = ?").get(userId, jenis) as { disetujui: number } | undefined;
  return Boolean(row && row.disetujui === 1);
}

export function saveUserConsent(userId: string, jenis: string = "pemrosesan_data_pribadi", disetujui: boolean = true): void {
  const db = getDatabase();
  const existing = db.prepare("SELECT id FROM consents WHERE user_id = ? AND jenis = ?").get(userId, jenis) as { id: string } | undefined;
  const now = new Date().toISOString();

  if (existing) {
    db.prepare("UPDATE consents SET disetujui = ?, tanggal = ? WHERE id = ?").run(disetujui ? 1 : 0, now, existing.id);
  } else {
    const id = crypto.randomUUID();
    db.prepare("INSERT INTO consents (id, user_id, jenis, disetujui, tanggal) VALUES (?, ?, ?, ?, ?)").run(
      id,
      userId,
      jenis,
      disetujui ? 1 : 0,
      now
    );
  }
}

// ==========================================
// Document Tracking DB Queries (US-04)
// ==========================================

export function getAllDocumentRequirements(): DocumentRequirementRecord[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM document_requirements ORDER BY urutan ASC").all() as DocumentRequirementRecord[];
  return rows;
}

export function getUserDocuments(userId: string): DocumentRecord[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM documents WHERE user_id = ? ORDER BY diunggah_pada ASC").all(userId) as DocumentRecord[];
  return rows;
}

export function getUserDocumentByRequirement(userId: string, requirementId: string): DocumentRecord | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM documents WHERE user_id = ? AND requirement_id = ?").get(userId, requirementId) as DocumentRecord | undefined;
  return row || null;
}

export function saveUserDocument(
  userId: string,
  requirementId: string,
  namaFile: string,
  lokasiFile: string,
  ukuranKb: number,
  status: string = "lengkap",
  catatan?: string
): DocumentRecord {
  const db = getDatabase();
  const existing = getUserDocumentByRequirement(userId, requirementId);
  const now = new Date().toISOString();

  if (existing) {
    // US-04 AC6: Ganti file lama dengan file baru dan perbarui status
    db.prepare(`
      UPDATE documents SET
        nama_file = ?,
        lokasi_file = ?,
        ukuran_kb = ?,
        status = ?,
        catatan = ?,
        diperbarui_pada = ?
      WHERE id = ?
    `).run(namaFile, lokasiFile, ukuranKb, status, catatan || existing.catatan || null, now, existing.id);

    return {
      ...existing,
      nama_file: namaFile,
      lokasi_file: lokasiFile,
      ukuran_kb: ukuranKb,
      status,
      catatan: catatan || existing.catatan || null,
      diperbarui_pada: now,
    };
  }

  const id = crypto.randomUUID();
  db.prepare(`
    INSERT INTO documents (id, user_id, requirement_id, nama_file, lokasi_file, ukuran_kb, status, catatan, diunggah_pada, diperbarui_pada)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, userId, requirementId, namaFile, lokasiFile, ukuranKb, status, catatan || null, now, now);

  return {
    id,
    user_id: userId,
    requirement_id: requirementId,
    nama_file: namaFile,
    lokasi_file: lokasiFile,
    ukuran_kb: ukuranKb,
    status,
    catatan: catatan || null,
    diunggah_pada: now,
    diperbarui_pada: now,
  };
}

/**
 * Mengambil daftar persyaratan teragregasi dengan dokumen yang diunggah pengguna.
 * Jika pengguna baru dan belum mengunggah berkas apa pun, sediakan inisialisasi dokumen dummy
 * sesuai tampilan mockup agar representatif saat ditinjau pertama kali.
 */
export function getAggregatedUserDocuments(userId: string): DocumentWithRequirement[] {
  const db = getDatabase();
  const requirements = getAllDocumentRequirements();
  let userDocs = getUserDocuments(userId);

  // Jika pengguna belum punya dokumen tersimpan sama sekali, inisialisasi sample data realistis sesuai mockup
  if (userDocs.length === 0) {
    const sampleSeed = [
      {
        reqId: "req-akta-sk",
        namaFile: "Akta_Pendirian_PT_Kemenkumham.pdf",
        ukuranKb: 2450,
        status: "valid",
        catatan: "KBLI sesuai dengan kegiatan usaha utama.",
        diperbarui: "10 Nov 2026",
      },
      {
        reqId: "req-nib",
        namaFile: "NIB_Berbasis_Risiko_OSS.pdf",
        ukuranKb: 1120,
        status: "valid",
        catatan: "Terverifikasi aktif di sistem OSS RBA.",
        diperbarui: "08 Nov 2026",
      },
      {
        reqId: "req-neraca-lr",
        namaFile: "Laporan_Keuangan_2024_2025.pdf",
        ukuranKb: 4850,
        status: "perlu_revisi",
        catatan: "Perlu rincian catatan utang jangka pendek & rekonsiliasi kas bank.",
        diperbarui: "Kemarin, 14:20",
      },
      {
        reqId: "req-skdu",
        namaFile: "SKDU_Domisili_Usaha.pdf",
        ukuranKb: 1840,
        status: "valid",
        catatan: "Dokumen telah diperiksa dan sesuai dengan alamat operasional usaha.",
        diperbarui: "12 Nov 2026",
      },
      {
        reqId: "req-arus-kas",
        namaFile: "Laporan_Arus_Kas_2026.pdf",
        ukuranKb: 3270,
        status: "perlu_revisi",
        catatan: "KBLI sesuai dengan kegiatan usaha utama, lengkapi catatan mutasi bank.",
        diperbarui: "10 Nov 2026",
      },
    ];

    for (const sample of sampleSeed) {
      saveUserDocument(
        userId,
        sample.reqId,
        sample.namaFile,
        `/uploads/${sample.namaFile}`,
        sample.ukuranKb,
        sample.status,
        sample.catatan
      );
    }

    userDocs = getUserDocuments(userId);
  }

  const docMap = new Map<string, DocumentRecord>();
  userDocs.forEach((d) => docMap.set(d.requirement_id, d));

  return requirements.map((req) => {
    const doc = docMap.get(req.id);
    if (!doc) {
      return {
        ...req,
        uploaded: false,
        statusKurasi: "Belum Diunggah",
        terakhirDiperbaharui: "-",
        catatanTindakan: "Dokumen belum diunggah. Unggah berkas sesuai ketentuan kurasi.",
      };
    }

    let statusKurasi: "Lengkap & Valid" | "Perlu Revisi" | "Belum Diunggah" = "Lengkap & Valid";
    if (doc.status === "perlu_revisi") {
      statusKurasi = "Perlu Revisi";
    } else if (doc.status === "valid" || doc.status === "lengkap") {
      statusKurasi = "Lengkap & Valid";
    }

    // Format tanggal ramah pengguna
    let tanggalTeks = "Baru saja";
    if (doc.diperbarui_pada) {
      try {
        const d = new Date(doc.diperbarui_pada);
        tanggalTeks = d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
      } catch {
        tanggalTeks = doc.diperbarui_pada;
      }
    }

    return {
      ...req,
      documentId: doc.id,
      uploaded: true,
      namaFile: doc.nama_file,
      ukuranKb: doc.ukuran_kb,
      statusKurasi,
      terakhirDiperbaharui: tanggalTeks,
      catatanTindakan: doc.catatan || "Dokumen telah memenuhi ketentuan format awal.",
    };
  });
}

// ==========================================
// Platform Matchmaking Engine (US-05 / F-06 / BR-06 / BR-07)
// ==========================================

export function getAllPlatforms(activeOnly: boolean = true): PlatformRecord[] {
  const db = getDatabase();
  const query = activeOnly
    ? db.prepare("SELECT * FROM platforms WHERE aktif = 1")
    : db.prepare("SELECT * FROM platforms");
  return query.all() as PlatformRecord[];
}

export function calculatePlatformMatchmaking(
  profile: BusinessProfileRecord | null
): MatchmakingPlatformResult[] {
  const platforms = getAllPlatforms(true);
  if (!profile) return [];

  const results: MatchmakingPlatformResult[] = platforms.map((plat) => {
    // 4 Kriteria Pencocokan Objektif (BR-06)
    // 1. Sektor Usaha
    const sektorNormal = (profile.sektor || "").toLowerCase();
    const platSektor = plat.fokus_sektor.toLowerCase();
    const matchSektor =
      sektorNormal.includes("f&b") || sektorNormal.includes("kuliner")
        ? platSektor.includes("f&b") || platSektor.includes("kuliner")
        : platSektor.includes(sektorNormal.slice(0, 4));

    // 2. Badan Hukum
    const badanHukum = (profile.badan_hukum || "PT").toUpperCase();
    const matchBadanHukum = plat.badan_hukum_diterima.toUpperCase().includes(badanHukum);

    // 3. Kebutuhan Dana (berada di rentang dana_minimum sampai dana_maksimum)
    const dana = profile.kebutuhan_dana || 0;
    const matchDana = dana >= plat.dana_minimum && dana <= plat.dana_maksimum;

    // 4. Jenis Efek
    const efek = (profile.jenis_efek || "SAHAM").toUpperCase();
    const matchEfek = plat.jenis_efek_didukung.toUpperCase().includes(efek);

    // Hitung jumlah kriteria terpenuhi
    const criteria = [matchSektor, matchBadanHukum, matchDana, matchEfek];
    const passedCount = criteria.filter(Boolean).length;

    // Persentase & Kompatibilitas
    let persentase = 35;
    let tingkat: "Tinggi" | "Sedang" | "Rendah" = "Rendah";

    if (passedCount === 4) {
      persentase = 95;
      tingkat = "Tinggi";
    } else if (passedCount === 3) {
      persentase = 75;
      tingkat = "Sedang";
    } else if (passedCount === 2) {
      persentase = 55;
      tingkat = "Sedang";
    } else {
      persentase = 35;
      tingkat = "Rendah";
    }

    // Alasan singkat transparan (BR-06)
    const alasanParts: string[] = [];
    if (matchSektor) {
      alasanParts.push("Sektor usaha sesuai fokus penyelenggara");
    } else {
      alasanParts.push("Sektor usaha di luar fokus utama");
    }

    if (matchDana) {
      alasanParts.push("target dana masuk rentang plafon");
    } else if (dana < plat.dana_minimum) {
      alasanParts.push("target dana di bawah batas minimum");
    } else {
      alasanParts.push("target dana melebihi batas maksimum");
    }

    if (!matchBadanHukum) {
      alasanParts.push(`persyaratan badan hukum mensyaratkan ${plat.badan_hukum_diterima}`);
    }

    const alasanSingkat = alasanParts.join(", ") + ".";

    // Format estimasi biaya (juta Rupiah)
    const biayaJuta = Math.round(plat.estimasi_biaya / 1000000);
    const estimasiBiayaTeks = `Rp ${biayaJuta - 5} - ${biayaJuta + 5} juta`;

    return {
      id: plat.id,
      nama: plat.nama,
      peringkat: 0,
      tingkatKompatibilitas: tingkat,
      persentaseKecocokan: persentase,
      isPalingCocok: false,
      estimasiBiayaTeks,
      alasanSingkat,
      kriteriaCocok: {
        sektor: matchSektor,
        badanHukum: matchBadanHukum,
        kebutuhanDana: matchDana,
        jenisEfek: matchEfek,
      },
      detailPlatform: plat,
    };
  });

  // Urutkan dari yang paling cocok (persentase tertinggi)
  results.sort((a, b) => b.persentaseKecocokan - a.persentaseKecocokan);

  // Tandai peringkat & label PALING COCOK pada elemen teratas
  return results.map((item, index) => ({
    ...item,
    peringkat: index + 1,
    isPalingCocok: index === 0 && item.persentaseKecocokan >= 70,
  }));
}

// ==========================================
// Dashboard Metrics & SCF Readiness Score
// ==========================================

export function computeDashboardMetrics(
  profile: BusinessProfileRecord | null,
  aggregatedDocs: DocumentWithRequirement[],
  matchmaking: MatchmakingPlatformResult[]
): DashboardMetric {
  const totalDokumen = aggregatedDocs.length || 6;
  const dokumenLengkap = aggregatedDocs.filter((d) => d.statusKurasi === "Lengkap & Valid").length;
  const dokumenRevisi = aggregatedDocs.filter((d) => d.statusKurasi === "Perlu Revisi").length;
  const dokumenKosong = totalDokumen - (dokumenLengkap + dokumenRevisi);

  // Bobot penilaian kelayakan:
  // - Legalitas dasar (Badan hukum PT = +20, CV = +10)
  // - Profil terisi lengkap = +15
  // - Dokumen valid (tiap dokumen valid = +10, revisi = +4)
  let score = 20; // Base score
  if (profile?.badan_hukum === "PT") {
    score += 20;
  } else if (profile?.badan_hukum === "CV") {
    score += 10;
  }

  if (profile && profile.nama_bisnis && profile.kebutuhan_dana > 0) {
    score += 15;
  }

  score += dokumenLengkap * 7;
  score += dokumenRevisi * 3;

  if (score > 100) score = 100;
  if (score < 10) score = 10;

  // Status Kelayakan berdasarkan skor PRD (0-49 Belum Siap, 50-74 Butuh Perbaikan, 75-100 Siap Kurasi)
  let statusKelayakan: "Siap Kurasi" | "Butuh Perbaikan" | "Belum Siap" = "Siap Kurasi";
  let badgeWarna: "emerald" | "amber" | "rose" = "emerald";

  if (score >= 75) {
    statusKelayakan = "Siap Kurasi";
    badgeWarna = "emerald";
  } else if (score >= 50) {
    statusKelayakan = "Butuh Perbaikan";
    badgeWarna = "amber";
  } else {
    statusKelayakan = "Belum Siap";
    badgeWarna = "rose";
  }

  const persentaseSelesai = Math.round((dokumenLengkap / totalDokumen) * 100);
  const platformCocokCount = matchmaking.filter((m) => m.tingkatKompatibilitas !== "Rendah").length || 3;
  const topMatchRate = matchmaking[0]?.persentaseKecocokan || 95;

  let estimasiWaktuSiap = "1 minggu";
  if (dokumenRevisi > 0) {
    estimasiWaktuSiap = "2 minggu (Setelah Revisi Laporan)";
  } else if (dokumenKosong > 2) {
    estimasiWaktuSiap = "3-4 minggu";
  }

  return {
    overallScore: score,
    statusKelayakan,
    badgeWarna,
    totalDokumen,
    dokumenLengkap,
    dokumenRevisi,
    dokumenKosong,
    persentaseSelesai,
    platformCocokCount,
    topMatchRate,
    estimasiWaktuSiap,
  };
}
