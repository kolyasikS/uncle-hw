import { hash, verify } from "@node-rs/argon2";
import { randomBytes } from "crypto";

export function generateAlphanumericCode(length = 6): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = randomBytes(length);
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }

  return result;
}

// Hashing a password
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, {
    memoryCost: 65536, // 64 MB
    timeCost: 3, // 3 iterations
    parallelism: 4, // 4 threads
  });
}

// Verifying a password
export async function verifyPassword(
  password: string,
  hashValue: string,
): Promise<boolean> {
  return await verify(hashValue, password);
}
