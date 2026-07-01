import express, { type Request } from "express";

import {
  type DailyWordCountFormValues,
  type WithId,
  type WordCountEntry,
} from "../../src/types.ts";

import { readJson } from "../csvHandler.ts";
import {
  deleteEntry,
  getEntriesByYear,
  getEntry,
  insertEntry,
  insertFic,
  processFandomForEntry,
  updateEntry,
} from "../db/queries.ts";
import { seedTables } from "../db/setup.ts";
import { type ApiError, type RequestWithId } from "../types.ts";

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
 * POST /api/entries/form
 * BODY: DailyWordCountFormValues
 */
entriesRouter.post("/form", (req, res) => {
  const formData = req.body as DailyWordCountFormValues;
  console.log("submitting DailyWordCountForm", formData);

  if (formData.id != null) {
    if (formData.ficId == null) {
      return res.status(400).send("Please supply a valid ficId.");
    }
    const entry: WithId<WordCountEntry> = {
      id: formData.id,
      count: formData.count,
      ficId: formData.ficId,
      date: formData.date,
    };
    updateEntry(entry);
    return res.json(entry).status(200);
  }

  let ficId = formData.ficId;
  if (ficId == null) {
    if (!formData.fic) {
      return res.status(400).send("Please supply a valid fic.");
    }
    if (!formData.fandom) {
      return res.status(400).send("Please supply a valid fandom.");
    }
    ficId = insertFic({
      name: formData.fic,
      fandom: formData.fandom,
      ship: formData.ship,
    });
  }

  if (ficId == null) {
    return res.status(500).send("Failed to create fic.");
  }

  const entry = insertEntry({
    date: formData.date,
    count: formData.count,
    ficId,
  });
  return res.json(entry).status(201);
});

/**
 * GET /api/entries
 */
entriesRouter.get("/", (_req, res) => {
  console.log("fetching word count entries");
  const data = getEntriesByYear();
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

  if (entry.id !== validateId(req.params.id)) {
    return res
      .status(400)
      .send(
        `The ID in the body (${entry.id}) does not match the route-provided ID (${req.params.id}).`,
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

  const response = processFandomForEntry(entry);

  if ("status" in response) {
    const error: ApiError = response as ApiError;
    return error.message
      ? res.status(error.status).send(error.message)
      : res.sendStatus(error.status);
  } else {
    return res.json(response as WithId<WordCountEntry>).status(204);
  }
});

export default entriesRouter;
