import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import pbkdf2 from "pbkdf2";
import { env } from "process";

import type { AuthUser, PasswordHash, User } from "./types";

export function hashPassword(password: string): PasswordHash {
  const salt = crypto.randomBytes(128).toString("base64");
  const iterations = 10000;
  const keylen = 64;
  const digest = "sha512";
  const hash = pbkdf2
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString();

  return {
    salt,
    hash,
    iterations,
    keylen,
    digest,
  };
}

export function passwordIsValid(password: string, user: AuthUser): boolean {
  const attemptHash = pbkdf2.pbkdf2Sync(
    password,
    user.salt,
    user.iterations,
    user.keylen,
    user.digest
  );
  return user.hash === attemptHash.toString();
}

export function removePasswordandAddToken(user: AuthUser): User {
  // use "object rest operator" to remove properties in a typescript-friendly way
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { salt, keylen, iterations, hash, digest, ...cleanUser } = user;

  // create token
  const token = createJWT(cleanUser);

  // return user with token
  return { ...cleanUser, token };
}

export function createJWT(user: User): string {
  if (!env.NEXTAUTH_SECRET) {
    throw new Error(
      "Unable to create token; please define NEXTAUTH_SECRET in .env.local"
    );
  }
  return jsonwebtoken.sign(user, env.NEXTAUTH_SECRET, { expiresIn: "24h" });
}
