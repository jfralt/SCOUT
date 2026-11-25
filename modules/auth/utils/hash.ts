import crypto from "node:crypto";

/**
 * Melakukan hash string sensitif (password atau kode OTP) menggunakan scrypt dengan random salt.
 * Format yang dihasilkan: salt:hash (Hex)
 */
export function hashSecret(secret: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(secret, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Memverifikasi teks rahasia terhadap format salt:hash
 */
export function verifySecret(secret: string, combinedHash: string): boolean {
  try {
    const parts = combinedHash.split(":");
    if (parts.length !== 2) return false;
    const [salt, key] = parts;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(secret, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

export const hashPassword = hashSecret;
export const verifyPassword = verifySecret;
export const hashOtp = hashSecret;
export const verifyOtp = verifySecret;
