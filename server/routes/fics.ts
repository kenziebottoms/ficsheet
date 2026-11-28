import express, { type Request } from "express";

import { type WithId, type Fic } from "../../src/types.ts";

import { deleteFic, getAllFics, insertFic, updateFic } from "../db/queries.ts";
import { type RequestWithId } from "../types.ts";

import { validateId } from "./entries.ts";

/** Root URL: /api/fics */
const ficsRouter = express.Router();

ficsRouter.get("/", (req, res) => {
  console.log("Getting fics (all time)");
  const { orderBy = "fic.id", dir = "ASC" } = req.query as Record<
    string,
    string
  >;
  if (!["ASC", "DESC"].includes(dir)) {
    return res
      .status(400)
      .send("Please supply a valid sort direction (ASC|DESC).");
  }
  if (!["fic.id", "fandom", "ship", "name"].includes(orderBy)) {
    return res
      .status(400)
      .send("Please supply a valid order property (fic.id|fandom|ship|name).");
  }
  const data = getAllFics(`ORDER BY ${orderBy} ${dir}`);
  return res.json(data).status(200);
});

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

  if (fic.id !== validateId(req.params.id)) {
    return res
      .status(400)
      .send(
        `The ID in the body (${fic.id}) does not match the route-provided ID (${req.params.id}).`,
      );
  }
  updateFic(fic as WithId<Fic>);
  return res.json(fic).status(204);
});

export default ficsRouter;
