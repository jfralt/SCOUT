import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import type { UserRecord, EmailOtpRecord, BusinessProfileRecord } from "../types/index";

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

  // Migrasi aman bila kolom lama 'name' digunakan
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

  // Inisialisasi tabel email_otps sesuai database-us-01.md & database-us-24.md
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

  // Migrasi aman untuk email_otps jika kolom US-24 belum ada
  try {
    const otpTableInfo = db.prepare("PRAGMA table_info(email_otps)").all() as Array<{ name: string }>;
    const otpColNames = otpTableInfo.map((col) => col.name);

    if (!otpColNames.includes("jumlah_percobaan")) {
      db.exec("ALTER TABLE email_otps ADD COLUMN jumlah_percobaan INTEGER DEFAULT 0");
    }
    if (!otpColNames.includes("tidak_berlaku")) {
      db.exec("ALTER TABLE email_otps ADD COLUMN tidak_berlaku INTEGER DEFAULT 0");
    }
  } catch (err) {
    console.error("Migration notice for email_otps table:", err);
  }

  // Inisialisasi tabel business_profiles sesuai database-us-02.md
  db.exec(`
    CREATE TABLE IF NOT EXISTS business_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      nama_bisnis TEXT DEFAULT '',
      badan_hukum TEXT NOT NULL,
      sektor TEXT NOT NULL,
      kebutuhan_dana REAL NOT NULL,
      kondisi_dokumen TEXT NOT NULL,
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

  dbInstance = db;
  return dbInstance;
}

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

  // Invaliasi kode OTP lama milik pengguna ini (set tidak_berlaku = 1 dan digunakan = 1) - US-24 AC6
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
      kondisi_dokumen, jangka_waktu_bulan, tujuan_pendanaan, rencana_penggunaan,
      penjelasan_penggunaan, dokumen_pendukung_url, status_draf, diperbarui_pada
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insert.run(
    id,
    userId,
    data.nama_bisnis || "",
    data.badan_hukum || "",
    data.sektor || "",
    data.kebutuhan_dana || 0,
    data.kondisi_dokumen || "",
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
    jangka_waktu_bulan: data.jangka_waktu_bulan || 12,
    tujuan_pendanaan: data.tujuan_pendanaan || "Pengembangan Usaha",
    rencana_penggunaan: data.rencana_penggunaan || "",
    penjelasan_penggunaan: data.penjelasan_penggunaan || "",
    dokumen_pendukung_url: data.dokumen_pendukung_url || null,
    status_draf: isDraft ? 1 : 0,
    diperbarui_pada: now,
  };
}
