import express from "express";

import { type WordCountEntry } from "../../src/types.ts";

import { insertWordCount } from "../queries.ts";

const entriesRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api/entries/:id */

/**
 * POST /api/entries
 * BODY: [ ... ]
 */
entriesRouter.post("/", (req, res) => {
  const entries = req.body as WordCountEntry[];
  console.log("posting word counts entry: ", entries);
  entries.map(insertWordCount);
  return res.json(entries).status(200);
});

export default entriesRouter;
