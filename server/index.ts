import express from "express";
import cors from "cors";

import { setup } from "./dbSetup.ts";
import { getYearlyWhereClause, select } from "./queries.ts";
import { readCSV } from "./csvHandler.ts";

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

app.get("/dailyTotals", (req, res) => {
  const { year } = req.query as Record<string, string>;
  if (!year || isNaN(parseInt(year, 10))) {
    res.status(400).send("please supply a valid year");
  }
  console.log("fetching daily totals" + (year ? ` (${year})` : ""));
  const data = select(
    `date, SUM(count) as daily_total FROM word_count ${getYearlyWhereClause(year)} GROUP BY date`,
  );
  res.json(data).status(200);
});
app.get("/entries", (_req, res) => {
  console.log("fetching word counts");
  const data = select("* FROM word_count ORDER BY date DESC");
  res.json(data).status(200);
});
app.post("/ingest", (req, res) => {
  const { filename, year, updateDb } = req.query as Record<string, string>;
  console.log(
    `ingesting ${filename} for ${year} (${updateDb === "true" ? "updating the database" : "dry run"})`,
  );
  if (!filename) {
    res.status(400).send("please supply a filename");
  }
  if (!year || isNaN(parseInt(year, 10))) {
    res.status(400).send("please supply a valid year");
  }
  readCSV(filename, parseInt(year, 10), updateDb === "true")
    .then((rows) => res.json(rows).status(201))
    .catch((error) => res.json(error).status(500));
});
app.get("/runningTotal", (_req, res) => {
  console.log("fetching running totals");
  const data = select(
    "date, SUM(count) OVER (ORDER BY date) AS running_total FROM word_count",
  );
  res.json(data).status(200);
});

app.listen(PORT, (error) => {
  console.log("seeding database");
  setup();
  console.log(error ?? `Server is running at http://localhost:${PORT}`);
});
