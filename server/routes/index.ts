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

apiRouter.use("/year/:year", yearRouter);

export default apiRouter;
