import express from "express";

import { select } from "../queries.ts";

import yearRouter from "./years.ts";

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

apiRouter.use("/year", yearRouter);

export default apiRouter;
