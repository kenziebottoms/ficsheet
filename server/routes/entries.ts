import express, { type Request } from "express";

import { type WordCountEntry } from "../../src/types.ts";

import { readJson } from "../csvHandler.ts";
import {
  deleteEntry,
  insertEntry,
  select,
  updateEntry,
} from "../db/queries.ts";
import { type RequestWithId } from "../types.ts";

const entriesRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api/entries/:id */

/**
 * POST /api/entries
 * BODY: WordCountEntry[]
 */
entriesRouter.post("/", (req, res) => {
  const entries = req.body as WordCountEntry[];
  console.log("posting word counts entry: ", entries);
  entries.map(insertEntry);
  return res.json(entries).status(200);
});

/**
 * GET /api/entries/export
 */
entriesRouter.get("/export", (_req, res) => {
  console.log("exporting entries");
  const data = select("* from word_count");
  return res.json(data).status(200);
});

/**
 * POST /api/entries/import?filename=file.json&updateDb=true
 * For importing a JSON file containing: WordCountEntry[]
 */
entriesRouter.post("/import", (req, res) => {
  const { filename, updateDb } = req.query as Record<string, string>;
  console.log(
    `importing ${filename} (${updateDb === "true" ? "updating the database" : "dry run"})`,
  );
  if (!filename) {
    return res.status(400).send("please supply a filename");
  }
  return readJson(filename, updateDb === "true")
    .then((rows) => res.json(rows).status(updateDb === "true" ? 201 : 200))
    .catch((error) => res.send(error).status(500));
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
/**
 * PUT /api/entries/:id
 */
entriesRouter.put("/:id", (req: RequestWithId, res) => {
  const entry = req.body as WordCountEntry;
  console.log("putting word counts entry: ", entry);

  if (entry == null || entry.id == null) {
    return res
      .status(400)
      .send(
        "This entry has no ID. To create a new entry, POST /api/entries/:id",
      );
  }
  updateEntry(entry as WordCountEntry & { id: number });
  return res.json(entry).status(204);
});

export default entriesRouter;
