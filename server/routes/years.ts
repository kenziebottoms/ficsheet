import express from "express";
import { select } from "../queries.ts";
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
yearRouter.use(":year", (req, res, next) => {
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

export default yearRouter;
