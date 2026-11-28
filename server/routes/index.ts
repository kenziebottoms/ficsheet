import express from "express";

import { type RunningTotal } from "../../src/types.ts";

import {
  getAllShips,
  getEntriesByYear,
  getFandomsByYear,
  getFicsByYear,
  select,
  selectUsers,
} from "../db/queries.ts";

import authRouter from "./auth/index.ts";
import entriesRouter from "./entries.ts";
import ficsRouter from "./fics.ts";
import goalsRouter from "./goals.ts";
import yearRouter from "./year.ts";
import passport from "./auth/passportStrategy.ts";

const apiRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api */

apiRouter.use("/auth", authRouter);

apiRouter.use(
  "/",
  passport.authenticate("jwt-cookiecombo", { session: false }),
);

apiRouter.use("/entries", entriesRouter);

/**
 * GET /api/export
 */
apiRouter.get("/export", (_req, res) => {
  console.log(`fetching fics (all time)`);
  const entries = getEntriesByYear();
  const fics = getFicsByYear();
  return res.json({ entries, fics }).status(200);
});

apiRouter.use("/fics", ficsRouter);

/**
 * GET /api/fandoms
 */
apiRouter.get("/fandoms", (_req, res) => {
  console.log("fetching fandoms (all time)");
  const data = getFandomsByYear();
  return res.json(data).status(200);
});

apiRouter.use("/goals", goalsRouter);

/**
 * GET /api/runningTotal
 */
apiRouter.get("/runningTotal", (_req, res) => {
  console.log(`fetching running total (all time)`);
  const data = select<RunningTotal>(
    `date, strftime('%m-%d', date) as monthDay, SUM(count) OVER (ORDER BY date) AS running_total FROM word_count`,
  );
  return res.json(data).status(200);
});

/**
 * GET /api/ships
 */
apiRouter.get("/ships", (_req, res) => {
  console.log("Getting ships (all time)");
  const data = getAllShips();
  return res.json(data).status(200);
});

/**
 * GET /api/users
 */
apiRouter.get("/users", (_req, res) => {
  console.log("fetching users");
  const data = selectUsers();
  return res.json(data).status(200);
});

apiRouter.use("/year/:year", yearRouter);

export default apiRouter;
