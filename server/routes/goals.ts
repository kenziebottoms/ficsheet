import express from "express";

import { type WithId, type Goal } from "../../src/types.ts";

import { getGoalsByYear, insertGoal, updateGoal } from "../db/queries.ts";
import { type RequestWithId } from "../types.ts";

import { validateId } from "./entries.ts";

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
 * BODY: Goal
 */
goalsRouter.post("/", (req, res) => {
  console.log("posting goal: ", req.body);
  const result = insertGoal(req.body satisfies Goal);
  return res.json(result).status(200);
});

/**
 * PUT /api/goals/:id
 */
goalsRouter.put("/:id", (req: RequestWithId, res) => {
  const goal = req.body as WithId<Goal>;
  console.log("putting goal: ", goal);

  if (goal == null || goal.id == null) {
    return res
      .status(400)
      .send("This goal has no ID. To create a new goal, POST /api/goal");
  }

  if (goal.id !== validateId(req.params.id)) {
    return res
      .status(400)
      .send(
        `The ID in the body (${goal.id}) does not match the route-provided ID (${req.params.id}).`,
      );
  }

  updateGoal(goal);
  return res.json(goal).status(204);
});

export default goalsRouter;
