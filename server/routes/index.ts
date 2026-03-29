import express from "express";

import yearRouter from "./years.ts";

const apiRouter = express.Router();

/** Root URL: /api */
apiRouter.use("/years", yearRouter);

export default apiRouter;
