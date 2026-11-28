import express, { type Request } from "express";

import passport from "./passportStrategy.ts";
import { hashPassword } from "./password.ts";

import { insertUser } from "../../db/queries.ts";
import type { PassportSession } from "../../types.ts";

import type { SignUpFormValues } from "../../../src/forms/types.js";

const authRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api/auth */

/**
 * POST /api/auth/login
 */
authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  const session = req.session as PassportSession;
  if (session.passport == null) {
    return res.status(401).send("Unauthenticated");
  }
  return res.status(200).json(session.passport.user);
});

/**
 * POST /api/auth/signup
 */
authRouter.post("/signup", function (req, res) {
  const formData = req.body as SignUpFormValues;

  hashPassword(formData.password)
    .then(({ salt, hash }) => {
      const user = insertUser({
        username: formData.username,
        email: formData.email,
        salt,
        hashedPassword: hash,
      });
      return res.status(201).json({ user });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message,
      });
    });
});

export default authRouter;
