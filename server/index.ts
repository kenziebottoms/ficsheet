import express from "express";
import cors from "cors";

import { setup } from "./dbSetup.ts";

import apiRouter from "./routes/index.ts";

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, (error) => {
  setup();
  console.log(error ?? `Server is running at http://localhost:${PORT}`);
});
