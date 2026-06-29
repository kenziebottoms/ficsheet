import express, { type Request } from "express";

import { type WordCountEntry } from "../../src/types.ts";

import { readJson } from "../csvHandler.ts";
import {
  deleteEntry,
  getEntry,
  getFicByTitle,
  insertEntry,
  insertFic,
  select,
  updateEntry,
} from "../db/queries.ts";
import { seedTables } from "../db/setup.ts";
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
 * GET /api/entries
 */
entriesRouter.get("/", (_req, res) => {
  console.log("fetching word count entries");
  const data = select<WordCountEntry>(
    "word_count.id, date, fic_id, fic.name as fic, fic.ship, fic.fandom, count from word_count INNER JOIN fic ON fic.id = fic_id ORDER BY date ASC",
  );
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
 * POST /api/entries/seed
 */
entriesRouter.post("/seed", (_req, res) => {
  console.log("seeding entries");
  seedTables();
  return res.status(201);
});

/** Return a valid positive integer or false given a string? id. */
export const validateId = (id?: string) => {
  console.log(`validating entry ID ${id}`);
  if (!id) {
    return false;
  }
  const parsedId = parseInt(id, 10);
  return parsedId ? parsedId : false;
};

/**
 * Validate `id` param
 */
entriesRouter.use("/:id", (req: Request<{ id?: string }>, res, next) => {
  const { id } = req.params;
  if (!validateId(id)) {
    return res.status(400).send("please supply a valid id");
  }
  next();
});

/**
 * GET /api/entries/:id
 */
entriesRouter.get("/:id", (req: RequestWithId, res) => {
  console.log("getting entry #", req.params.id);
  const entry = getEntry(req.params.id);
  if (entry) {
    return res.json(entry).status(200);
  }
  return res.sendStatus(404);
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

/**
 * POST /api/entries/:id/processFandom
 */
entriesRouter.post("/:id/processFandom", (req: RequestWithId, res) => {
  const id = validateId(req.params.id);
  if (!id) return res.status(400);

  const entry = getEntry(id);
  console.log("processing fandom for fic #", id);

  if (entry == null) return res.status(404);

  const { fic, fandom, ficId } = entry;
  if (ficId == null) {
    let newFicId: number | undefined;
    let ficLookup;
    if (fic) {
      ficLookup = getFicByTitle(fic);
    } else {
      return res.status(400).json({
        status: 400,
        message: `Entry #${req.params.id} has no fic title.`,
      });
    }
    if (ficLookup?.id != null) {
      newFicId = ficLookup.id;
    } else {
      if (!fandom) {
        return res.status(400).json({
          status: 400,
          message: `Entry #${req.params.id} has no fandom.`,
        });
      } else {
        newFicId = insertFic({
          name: fic,
          fandom,
          ship: null,
        })?.id;
      }
    }
    if (newFicId != null) {
      const newEntry = {
        id,
        ...entry,
        ficId: newFicId,
      };
      updateEntry(newEntry);
      return res.json(newEntry).status(204);
    } else {
      return res
        .status(500)
        .json({ status: 500, message: "Failed to create fandom." });
    }
  } else {
    return res
      .json({ status: 304, message: "This entry already has a fic_id." })
      .status(304);
  }
});

export default entriesRouter;
