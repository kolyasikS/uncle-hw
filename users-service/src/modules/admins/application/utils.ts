import * as argon2 from "argon2";

export async function checkPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  try {
    const result = await argon2.verify(hash, password);
    return result;
  } catch (error) {
    return false;
  }
}
