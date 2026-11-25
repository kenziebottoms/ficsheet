import express, { type Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { type SignUpFormValues } from "../../src/forms/types.ts";
import { createUserFromSignUpForm } from "../db/queries.ts";

const authRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api */

/**
 * POST /api/signup
 * BODY: SignUpFormValues
 */
authRouter.post("/signup", async (req, res) => {
  const formValues = req.body as SignUpFormValues;
  console.log("posting sign up form but not snitching");
  const result = createUserFromSignUpForm(formValues);
  return res.json(result).status(201);
});

export default authRouter;
