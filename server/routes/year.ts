import express, { type Request } from "express";

import { type Fandom, type Fic, type RunningTotal } from "../../src/types.ts";

import { readCSV } from "../csvHandler.ts";
import {
  deleteEntriesByYear,
  getYearlyWhereClause,
  select,
  validateYear,
} from "../db/queries.ts";
import { type YearRequest } from "../types.ts";

const yearRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api/year/:year */

/**
 * Validate `year` param
 */
yearRouter.use("/", (req: Request<{ year?: string }>, res, next) => {
  const { year } = req.params;
  if (!validateYear(year)) {
    return res.status(400).send("please supply a valid year");
  }
  next();
});

/**
 * GET /api/year/:year/dailyTotals
 */
yearRouter.get("/dailyTotals", (req: YearRequest, res) => {
  console.log(`fetching daily totals (${req.params.year})`);
  const data = select(
    `date, SUM(count) as daily_total FROM word_count ${getYearlyWhereClause(req.params.year)} GROUP BY date`,
  );
  return res.json(data).status(200);
});

/**
 * GET /api/year/:year/entries
 */
yearRouter.get("/entries", (req: YearRequest, res) => {
  console.log(`fetching word counts (${req.params.year})`);
  const data = select(
    `word_count.id, date, fic_id as ficId, fic.name as fic, fic.ship, fic.fandom, count from word_count JOIN fic ON fic.id = fic_id ${getYearlyWhereClause(req.params.year)} ORDER BY date ASC`,
  );
  return res.json(data).status(200);
});

/**
 * DELETE /api/year/:year/entries
 */
yearRouter.delete("/entries", (req: YearRequest, res) => {
  console.log(`forgetting ${req.params.year})`);
  deleteEntriesByYear(req.params.year);
  res.json(req.params.year).status(204);
});

/**
 * GET /api/year/:year/fandoms
 */
yearRouter.get("/fandoms", (req: YearRequest, res) => {
  console.log(`fetching fandoms (${req.params.year}`);
  const data = select<Fandom>(
    `fic.fandom as name, min(date) as firstWritten, max(date) as lastWritten,
    SUM(count) as totalWordsWritten \
    FROM word_count JOIN fic ON word_count.fic_id = fic.id \
    ${getYearlyWhereClause(req.params.year)} GROUP BY fic.fandom ORDER BY fic.fandom ASC`,
  );
  return res.json(data).status(200);
});

/**
 * GET /api/year/:year/fics
 */
yearRouter.get("/fics", (req: YearRequest, res) => {
  console.log(`fetching fics (${req.params.year})`);
  const data = select<Fic>(
    `fic.*, min(date) as firstWritten, max(date) as lastWritten,
    SUM(count) as totalWordsWritten \
    FROM word_count JOIN fic ON word_count.fic_id = fic.id \
    ${getYearlyWhereClause(req.params.year)} GROUP BY fic.id ORDER BY name ASC`,
  );
  console.log(data);
  return res.json(data).status(200);
});

/**
 * POST /api/year/:year/ingest?filename=file.csv&updateDb=true
 * For ingesting lossy Word Count CSVs
 */
yearRouter.post("/ingest", (req: YearRequest, res) => {
  const { filename, updateDb } = req.query as Record<string, string>;
  console.log(
    `ingesting ${filename} for ${req.params.year} (${updateDb === "true" ? "updating the database" : "dry run"})`,
  );
  if (!filename) {
    return res.status(400).send("please supply a filename");
  }
  return readCSV(filename, parseInt(req.params.year, 10), updateDb === "true")
    .then((rows) => res.json(rows).status(updateDb === "true" ? 201 : 200))
    .catch((error) => res.json(error).status(500));
});

/**
 * GET /api/year/:year/runningTotal
 */
yearRouter.get("/runningTotal", (req: YearRequest, res) => {
  console.log(`fetching running totals (${req.params.year})`);
  const data = select<RunningTotal>(
    `date, SUM(count) OVER (ORDER BY date) AS running_total FROM word_count ${getYearlyWhereClause(req.params.year)}`,
  );
  return res.json(data).status(200);
});

export default yearRouter;
