import express, { type Request } from "express";

import { readCSV } from "../csvHandler.ts";
import { getYearlyWhereClause, select } from "../queries.ts";
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
  console.log(`validating year ${year}`);
  if (year == null || Array.isArray(year)) {
    return res.status(400).send("please supply a valid year");
  }
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
  console.log(`fetching word counts (${req.params.year}`);
  const data = select(
    `* FROM word_count ${getYearlyWhereClause(req.params.year)} ORDER BY date ASC`,
  );
  return res.json(data).status(200);
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
 * POST /api/year/:year/ingest?filename=file.txt&updateDb=true
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
    .then((rows) => res.json(rows).status(201))
    .catch((error) => res.json(error).status(500));
});

/**
 * GET /api/year/:year/runningTotal
 */
yearRouter.get("/runningTotal", (req: YearRequest, res) => {
  console.log(`fetching running totals (${req.params.year})`);
  const data = select(
    `date, SUM(count) OVER (ORDER BY date) AS running_total FROM word_count ${getYearlyWhereClause(req.params.year)}`,
  );
  return res.json(data).status(200);
});

export default yearRouter;
