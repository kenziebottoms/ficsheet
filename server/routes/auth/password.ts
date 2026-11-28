import * as crypto from "crypto";

import type { Password, UserWithPassword } from "../../types.ts";

import { VAGUE_INVALID_LOGIN_RESPONSE } from "./passportStrategy.ts";

const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = "sha256";
const ENCODING = "base64";

export const hashPassword = (password: string): Promise<Password> =>
  new Promise((resolve, reject) => {
    if (!password) {
      return reject({
        status: 400,
        message: "Please provide a non-empty password.",
      });
    }
    var salt = crypto.randomBytes(SALT_LENGTH).toString(ENCODING);
    crypto.pbkdf2(
      password,
      salt,
      ITERATIONS,
      PASSWORD_LENGTH,
      DIGEST,
      (err: Error | null, hash) => {
        if (err) {
          return reject(err);
        }

        resolve({
          hash: hash.toString(ENCODING),
          salt,
        });
      },
    );
  });

export function verifyPassword(
  passwordAttempt: string,
  user: UserWithPassword,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) =>
    crypto.pbkdf2(
      passwordAttempt,
      user.salt,
      ITERATIONS,
      PASSWORD_LENGTH,
      DIGEST,
      (error, hash) => {
        if (error) {
          return reject(error);
        }
        if (
          !crypto.timingSafeEqual(
            Buffer.from(user.hashedPassword, ENCODING),
            hash,
          )
        ) {
          console.log("hash not timing safe equal");
          return reject(VAGUE_INVALID_LOGIN_RESPONSE);
        }

        return resolve(user.hashedPassword === hash.toString(ENCODING));
      },
    ),
  );
}
