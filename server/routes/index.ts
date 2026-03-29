import express from "express";

import { select } from "../queries.ts";
import { type YearRequest } from "../types.ts";

import yearRouter from "./year.ts";

const apiRouter = express.Router();

/** Root URL: /api */

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
