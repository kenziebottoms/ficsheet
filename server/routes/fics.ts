import express from "express";

import { type Fic } from "../../src/types.ts";

import { insertFic } from "../db/queries.ts";

const ficsRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api/fics */

/**
 * POST /api/fics
 * BODY: Fic[]
 */
ficsRouter.post("/", (req, res) => {
  const fics = req.body as Fic[];
  console.log("posting fics: ", fics);
  fics.map(insertFic);
  return res.json(fics).status(200);
});

export default ficsRouter;
