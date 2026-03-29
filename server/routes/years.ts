import express from "express";

import { getYearlyWhereClause, select } from "../queries.ts";
import { type YearRequest } from "../types.ts";

const yearRouter = express.Router();

/** Root URL: /api/years */

/**
 * GET /api/years
 * returns a numerically sorted array of years represented by the entries in `word_count`
 */
yearRouter.get("/", (_req, res) => {
  const data = select<{ year: string }>(
    `DISTINCT strftime('%Y', date) as year FROM word_count`,
  ).map(({ year }) => parseInt(year, 10));
  return res.json(data.sort()).status(200);
});

/**
 * Validate `year` param
 */
yearRouter.use("/:year", (req, res, next) => {
  const year = req.params.year as string;
  const validatedYear = parseInt(year, 10);
  if (
    !validatedYear ||
    isNaN(validatedYear) ||
    validatedYear > 2100 ||
    validatedYear < 2000
  ) {
    return res.status(400).send("please supply a valid year");
  }
  next();
});

yearRouter.get("/:year/runningTotal", (req: YearRequest, res) => {
  console.log(`fetching running totals (${req.params.year})`);
  const data = select(
    `date, SUM(count) OVER (ORDER BY date) AS running_total FROM word_count ${getYearlyWhereClause(req.params.year)}`,
  );
  return res.json(data).status(200);
});

export default yearRouter;
