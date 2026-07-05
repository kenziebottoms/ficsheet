import express, { type Request } from "express";
import _ from "lodash";

import {
  type WithId,
  type WordCountEntry,
  type RunningTotal,
} from "../../src/types.ts";

import {
  deleteEntriesByYear,
  getEntriesByYear,
  getFandomsByYear,
  getFicsByYear,
  getYearlyWhereClause,
  importFicForEntry,
  select,
  validateYear,
} from "../db/queries.ts";
import { type ApiError, type YearRequest } from "../types.ts";

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
  const data = getEntriesByYear(req.params.year);
  return res.json(data).status(200);
});

/**
 * POST /api/year/:year/entries/importFics
 */
yearRouter.post("/entries/importFics", (req: YearRequest, res) => {
  console.log(`importing fics (${req.params.year})`);
  const entries = getEntriesByYear(req.params.year);
  const results = entries.map(importFicForEntry);
  const errors = results.filter(
    (result) =>
      _.get(result, "status") != null && _.get(result, "status") !== 304,
  ) as ApiError[];
  const newEntries = results.filter(
    (result) => _.get(result, "id") != null,
  ) as WithId<WordCountEntry>[];

  return res
    .json({
      errors,
      newEntries,
    })
    .sendStatus(errors.length > 0 ? 300 : 201);
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
 * GET /api/year/:year/export
 */
yearRouter.get("/export", (req: YearRequest, res) => {
  console.log(`fetching fics (${req.params.year})`);
  const entries = getEntriesByYear(req.params.year);
  const fics = getFicsByYear(req.params.year);
  return res.json({ entries, fics }).status(200);
});

/**
 * GET /api/year/:year/fandoms
 */
yearRouter.get("/fandoms", (req: YearRequest, res) => {
  console.log(`fetching fandoms (${req.params.year}`);
  const data = getFandomsByYear(req.params.year);
  return res.json(data).status(200);
});

/**
 * GET /api/year/:year/fics
 */
yearRouter.get("/fics", (req: YearRequest, res) => {
  console.log(`fetching fics (${req.params.year})`);
  const data = getFicsByYear(req.params.year);
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
