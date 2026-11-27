import express from "express";
import session from "express-session";
import cors from "cors";

import { createTables } from "./db/setup.ts";

import apiRouter from "./routes/index.ts";

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  }),
);

app.use("/api", apiRouter);

app.listen(PORT, (error) => {
  createTables();
  console.log(error ?? `Server is running at http://localhost:${PORT}`);
});
