import * as crypto from "crypto";
import { type Password } from "../../types.ts";
import { type User } from "../../../src/types.ts";

const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = "sha256";
const ENCODING = "base64";

export const hashPassword = (password: string): Promise<Password> =>
  new Promise((resolve, reject) => {
    if (!password) {
      return reject({
        cause: "Please provide a non-empty password.",
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
  user: User,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    if (!user.salt) {
      return reject({
        cause: "Please provide a valid salt.",
      });
    }
    if (!user.hashedPassword) {
      return reject({
        cause: "The user does not have a valid hashed password.",
      });
    }
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

        resolve(user.hashedPassword === hash.toString(ENCODING));
      },
    );
  });
}
