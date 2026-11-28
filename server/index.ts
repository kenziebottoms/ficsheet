import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { createTables } from "./db/setup.ts";

import apiRouter from "./routes/index.ts";

const app = express();
const PORT = 2000;
export const COOKIE_KEY = "keyboard cat";

app.use(cookieParser("JWT_SECRET"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", apiRouter);

app.listen(PORT, (error) => {
  createTables();
  console.log(error ?? `Server is running at http://localhost:${PORT}`);
});
