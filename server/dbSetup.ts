import { db, insertWordCount } from "./queries.ts";

const createTables = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS word_count (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      count INTEGER,
      fic TEXT,
      fandom TEXT
    ) STRICT;
  `);
};

const seedTables = () => {
  insertWordCount({
    date: "2026-01-27",
    count: 131,
    fic: "transception",
    fandom: "Inception",
  });
  insertWordCount({
    date: "2026-01-28",
    count: 13,
    fic: "transception",
    fandom: "Inception",
  });
  insertWordCount({
    date: "2026-01-29",
    count: 24,
    fic: "transception",
    fandom: "Inception",
  });
  insertWordCount({
    date: "2026-02-12",
    count: 47,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-13",
    count: 64,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-14",
    count: 133,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
};

export const setup = (seed: boolean) => {
  createTables();
  if (seed) {
    seedTables();
  }
};
