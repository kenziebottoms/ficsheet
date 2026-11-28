import express from "express";
import cors from "cors";

import { createTables } from "./db/setup.ts";

import apiRouter from "./routes/index.ts";

const app = express();
const PORT = 2000;
export const COOKIE_KEY = "keyboard cat";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.listen(PORT, (error) => {
  createTables();
  console.log(error ?? `Server is running at http://localhost:${PORT}`);
});
