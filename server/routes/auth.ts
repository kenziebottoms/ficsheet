import express, { type Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const authRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api/auth */

/**
 * POST /api/auth/signup
 * BODY: SignUpFormValues
 */
authRouter.post("/signup", async (req, res) => {
  const formValues = req.body as SignUpFormValues[];
  console.log("posting sign up form but not snitching");
  const user = await createUserFromSignUpForm(formValues).catch((err) => {
    return res.status(400).send(err.message);
  });
  return res.json(user).status(201);
});

export default authRouter;
