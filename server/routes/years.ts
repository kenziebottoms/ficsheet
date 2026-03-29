import express from "express";

import { getYearlyWhereClause, select } from "../queries.ts";
import { type YearRequest } from "../types.ts";

const yearRouter = express.Router();
const singleYearRouter = express.Router();

/** Root URL: /api/year */

/**
 * Validate `year` param
 */
yearRouter.use("/:year", (req: YearRequest, res, next) => {
  const year = req.params.year;
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

/**
 * GET /api/year/:year/runningTotal
 */
singleYearRouter.get("/runningTotal", (req: YearRequest, res) => {
  console.log(`fetching running totals (${req.params.year})`);
  const data = select(
    `date, SUM(count) OVER (ORDER BY date) AS running_total FROM word_count ${getYearlyWhereClause(req.params.year)}`,
  );
  return res.json(data).status(200);
});

yearRouter.use("/:year", singleYearRouter);

export default yearRouter;
