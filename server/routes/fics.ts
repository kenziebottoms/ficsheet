import express, { type Request } from "express";

import { type Fic } from "../../src/types.ts";

import { deleteFic, insertFic, updateFic } from "../db/queries.ts";
import { type RequestWithId } from "../types.ts";

import { validateId } from "./entries.ts";

const ficsRouter = express.Router({
  // pass nested route params to children
  mergeParams: true,
});

/** Root URL: /api/fics */

/**
 * POST /api/fics
 * BODY: Fic[]
 */
ficsRouter.post("/", (req, res) => {
  const fics = req.body as Fic[];
  console.log("posting fics: ", fics);
  fics.map(insertFic);
  return res.json(fics).status(200);
});

/**
 * Validate `id` param
 */
ficsRouter.use("/:id", (req: Request<{ id?: string }>, res, next) => {
  const { id } = req.params;
  if (!validateId(id)) {
    return res.status(400).send("please supply a valid id");
  }
  next();
});

/**
 * DELETE /api/fics/:id
 */
ficsRouter.delete("/:id", (req: RequestWithId, res) => {
  console.log("deleting fic: ", req.params.id);
  deleteFic(req.params.id);
  return res.json(req.params.id).status(204);
});

/**
 * PUT /api/fics/:id
 */
ficsRouter.put("/:id", (req: RequestWithId, res) => {
  const fic = req.body as Fic;
  console.log("putting fic: ", fic);

  if (fic == null || fic.id == null) {
    return res
      .status(400)
      .send("This fic has no ID. To create a new fic, POST /api/fics/:id");
  }
  updateFic(fic as Fic & { id: number });
  return res.json(fic).status(204);
});

export default ficsRouter;
