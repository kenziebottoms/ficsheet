import express from "express";
import cors from "cors";

import { setup } from "./dbSetup.ts";
import { select } from "./queries.ts";

const app = express();
const PORT = 2000;

app.use(cors());
app.use(express.json());

app.post("/seed", (_req, res) => {
  console.log("seeding database");
  setup(true);
  res.status(201);
});
app.get("/wordCount", (_req, res) => {
  console.log("fetching word counts");
  const data = select("* from word_count");
  res.json(data).status(200);
});

app.listen(PORT, (error) => {
  console.log("seeding database");
  setup(true);
  console.log(error ?? `Server is running at http://localhost:${PORT}`);
});
