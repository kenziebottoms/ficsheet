import express from "express";
import cors from "cors";

import type { WordCountEntry } from "../src/types.ts";

import { readCSV } from "./csvHandler.ts";
import { setup } from "./dbSetup.ts";
import { getYearlyWhereClause, insertWordCount, select } from "./queries.ts";
import apiRouter from "./routes/index.ts";

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.post("/entries", (req, res) => {
  console.log("posting word counts entry: ");
  const entries = req.body.entries as WordCountEntry[];
  entries.map(insertWordCount);
  return res.json(entries).status(200);
});
app.post("/ingest", (req, res) => {
  const { filename, year, updateDb } = req.query as Record<string, string>;
  console.log(
    `ingesting ${filename} for ${year} (${updateDb === "true" ? "updating the database" : "dry run"})`,
  );
  if (!filename) {
    return res.status(400).send("please supply a filename");
  }
  if (!year || isNaN(parseInt(year, 10))) {
    return res.status(400).send("please supply a valid year");
  }
  return readCSV(filename, parseInt(year, 10), updateDb === "true")
    .then((rows) => res.json(rows).status(201))
    .catch((error) => res.json(error).status(500));
});

app.listen(PORT, (error) => {
  console.log("seeding database");
  setup();
  console.log(error ?? `Server is running at http://localhost:${PORT}`);
});
