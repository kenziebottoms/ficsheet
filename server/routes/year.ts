import express, { type Request } from "express";

import { type RunningTotal, type Timeframe } from "../../src/types.ts";

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
    `* FROM word_count ${getYearlyWhereClause(req.params.year)} ORDER BY date ASC`,
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
  const data = select<{ fandom: string }>(
    `DISTINCT fandom FROM word_count ${getYearlyWhereClause(req.params.year)} ORDER BY fandom ASC`,
  );
  return res.json(data.map(({ fandom }) => fandom)).status(200);
});

/**
 * GET /api/year/:year/fandomTimelines
 */
yearRouter.get("/fandomTimelines", (req: YearRequest, res) => {
  console.log(`fetching fandom timelines (${req.params.year}`);
  const data = select<Timeframe>(
    `DISTINCT min(date) as firstWritten, max(date) as lastWritten, fandom as label FROM word_count ${getYearlyWhereClause(req.params.year)} GROUP BY fandom ORDER BY firstWritten ASC`,
  );
  return res.json(data).status(200);
});

/**
 * GET /api/year/:year/ficTimelines
 */
yearRouter.get("/ficTimelines", (req: YearRequest, res) => {
  console.log(`fetching fic timelines (${req.params.year}`);
  const data = select<Timeframe>(
    `DISTINCT min(date) as firstWritten, max(date) as lastWritten, fic as label FROM word_count ${getYearlyWhereClause(req.params.year)} GROUP BY fic ORDER BY firstWritten ASC`,
  );
  return res.json(data).status(200);
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
