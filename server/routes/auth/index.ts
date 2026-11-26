import express from "express";

import passport from "./passportStrategy.ts";
import { hashPassword } from "./password.ts";
import type { SignUpFormValues } from "../../../src/forms/types.js";
import { insertUser } from "../../db/queries.ts";
import type { Password } from "../../types.ts";
import _ from "lodash";

const authRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api */

/**
 * POST /api/login
 */
authRouter.post("/login", passport.authenticate("local"));

/**
 * POST /api/signup
 */
authRouter.post("/signup", function (req, res, next) {
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
