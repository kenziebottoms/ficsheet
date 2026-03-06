import express from "express";
import cors from "cors";

import { setup } from "./dbSetup.ts";
import { select } from "./queries.ts";

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

app.get("/entries", (_req, res) => {
  console.log("fetching word counts");
  const data = select("* FROM word_count ORDER BY date DESC");
  res.json(data).status(200);
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
