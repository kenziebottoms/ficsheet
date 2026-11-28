import express, { type Request } from "express";

import passport from "./passportStrategy.ts";
import { hashPassword } from "./password.ts";

import { insertUser } from "../../db/queries.ts";
import type { ApiError } from "../../types.ts";

import type { User, WithId } from "../../../src/types.ts";
import type { SignUpFormValues } from "../../../src/forms/types.js";

const authRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api/auth */

/**
 * POST /api/auth/login
 */
authRouter.post("/login", (req, res) => {
  passport.authenticate("local", (err: ApiError, user: WithId<User>) => {
    if (err) {
      return res.status(err.status).json(err);
    }
    if (user == null) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    return res.status(200).json({
      id: user.id,
      username: user.username,
    });
  })(req, res);
});

/**
 * POST /api/auth/logout
 */
authRouter.post("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.sendStatus(200);
  });
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
      return res.status(201).json({
        id: user.id,
        username: user.username,
      });
    })
    .catch((err: ApiError) => res.status(err.status).json(err));
});

export default authRouter;
