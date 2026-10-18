import express, { type Request } from "express";

import { getGoalsByYear, insertGoal } from "../db/queries.ts";
import { type Goal } from "../../src/types.ts";

const goalsRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api/goals */

/**
 * GET /api/goals
 */
goalsRouter.get("/", (_req, res) => {
  console.log("fetching goals");
  const data = getGoalsByYear();
  return res.json(data).status(200);
});

/**
 * POST /api/goals
 * BODY: Goal[]
 */
goalsRouter.post("/", (req, res) => {
  const goals = req.body as Goal[];
  console.log("posting goals: ", goals);
  goals.map(insertGoal);
  return res.json(goals).status(200);
});

export default goalsRouter;
