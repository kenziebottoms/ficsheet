import express from "express";

import { select } from "../db/queries.ts";

import entriesRouter from "./entries.ts";
import yearRouter from "./year.ts";

const apiRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api */

apiRouter.use("/entries", entriesRouter);

apiRouter.get("/fandomTotals", (req, res) => {
  console.log("fetching fandom totals (all time)");
  const data = select(
    `fandom, SUM(count) as count from word_count GROUP BY fandom`,
  );
  return res.json(data).status(200);
});

/**
 * GET /api/runningTotal
 */
apiRouter.get("/runningTotal", (_req, res) => {
  console.log(`fetching running total (all time)`);
  const data = select(
    `date, strftime('%m-%d', date) as monthDay, SUM(count) OVER (ORDER BY date) AS running_total FROM word_count`,
  );
  return res.json(data).status(200);
});

/**
 * GET /api/years
 * returns a numerically sorted array of years represented by the entries in `word_count`
 */
apiRouter.get("/years", (_req, res) => {
  const data = select<{ year: string }>(
    `DISTINCT strftime('%Y', date) as year FROM word_count ORDER BY year DESC`,
  ).map(({ year }) => parseInt(year, 10));
  return res.json(data).status(200);
});

apiRouter.use("/year/:year", yearRouter);

export default apiRouter;
