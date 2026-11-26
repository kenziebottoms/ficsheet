import express from "express";

import passport from "./passportStrategy.ts";

const authRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api */

/**
 * POST /api/signup
 * BODY: SignUpFormValues
 */
authRouter.post("/signup", passport.authenticate("local"));

export default authRouter;
