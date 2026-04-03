import express, { type Request } from "express";

import { type WordCountEntry } from "../../src/types.ts";

import { deleteEntry, insertWordCount } from "../queries.ts";
import { type RequestWithId } from "../types.ts";

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

/**
 * Validate `id` param
 */
entriesRouter.use("/:id", (req: Request<{ id?: string }>, res, next) => {
  const { id } = req.params;
  console.log(`validating entry ID ${id}`);
  if (id == null || id == "") {
    return res.status(400).send("please supply a valid id");
  }
  const validatedId = parseInt(id, 10);
  if (isNaN(validatedId) || validatedId < 0) {
    return res.status(400).send("please supply a valid id");
  }
  next();
});

/**
 * DELETE /api/entries/:id
 */
entriesRouter.delete("/:id", (req: RequestWithId, res) => {
  console.log("deleting word counts entry: ", req.params.id);
  deleteEntry(req.params.id);
  return res.json(req.params.id).status(204);
});

export default entriesRouter;
