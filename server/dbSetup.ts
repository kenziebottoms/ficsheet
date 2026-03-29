import { db, insertWordCount } from "./queries.ts";

const createTables = () => {
  console.log("creating tables");
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
  console.log("seeding database");
  insertWordCount({
    date: "2026-01-04",
    count: 119,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-01-05",
    count: 243,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-01-08",
    count: 211,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-01-12",
    count: 108,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-01-13",
    count: 72,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-01-14",
    count: 135,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-01-15",
    count: 1,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-01-17",
    count: 64,
    fic: "transception",
    fandom: "Inception",
  });
  insertWordCount({
    date: "2026-01-19",
    count: 432,
    fic: "transception",
    fandom: "Inception",
  });
  insertWordCount({
    date: "2026-01-22",
    count: 7,
    fic: "transception",
    fandom: "Inception",
  });
  insertWordCount({
    date: "2026-01-23",
    count: 152,
    fic: "transception",
    fandom: "Inception",
  });
  insertWordCount({
    date: "2026-01-25",
    count: 167,
    fic: "transception",
    fandom: "Inception",
  });
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
    date: "2026-01-31",
    count: 13,
    fic: "transception",
    fandom: "Inception",
  });
  insertWordCount({
    date: "2026-02-01",
    count: 52,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-03",
    count: 53,
    fic: "muzzled max 1",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-03",
    count: 18,
    fic: "muzzled max 2",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-03",
    count: 261,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-06",
    count: 73,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-07",
    count: 32,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-10",
    count: 39,
    fic: "muzzled max 3",
    fandom: "Mad Max",
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
  insertWordCount({
    date: "2026-02-15",
    count: 10,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-19",
    count: 21,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-20",
    count: 35,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-22",
    count: 43,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-25",
    count: 4,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-02-26",
    count: 14,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-03-02",
    count: 34,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-03-04",
    count: 56,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-03-06",
    count: 89,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-03-08",
    count: 54,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-03-10",
    count: 206,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-03-11",
    count: 25,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-03-13",
    count: 56,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-03-17",
    count: 60,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
  insertWordCount({
    date: "2026-03-18",
    count: 27,
    fic: "muzzled max 3",
    fandom: "Mad Max",
  });
};

export const setup = (seed = false) => {
  createTables();
  if (seed) {
    seedTables();
  }
};
