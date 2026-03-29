import express from "express";

import { type WordCountEntry } from "../../src/types.ts";

import { insertWordCount, select } from "../queries.ts";
import { type YearRequest } from "../types.ts";

import yearRouter from "./year.ts";

const apiRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api */

/**
 * POST /api/entries
 */
apiRouter.post("/entries", (req, res) => {
  console.log("posting word counts entry: ");
  const entries = req.body.entries as WordCountEntry[];
  entries.map(insertWordCount);
  return res.json(entries).status(200);
});

/**
 * GET /api/years
 * returns a numerically sorted array of years represented by the entries in `word_count`
 */
apiRouter.get("/years", (_req, res) => {
  const data = select<{ year: string }>(
    `DISTINCT strftime('%Y', date) as year FROM word_count`,
  ).map(({ year }) => parseInt(year, 10));
  return res.json(data.sort()).status(200);
});

/**
 * Validate `year` param
 */
apiRouter.use("/year/:year", (req: YearRequest, res, next) => {
  console.log(`validating year ${req.params.year}`);
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
apiRouter.use("/year/:year", yearRouter);

export default apiRouter;
