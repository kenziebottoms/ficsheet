import { db, insertEntry } from "./queries.ts";
import seedEntries from "./seedData.ts";

export const createTables = () => {
  console.log("creating tables");
  db.exec(`
    CREATE TABLE IF NOT EXISTS word_count (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      date TEXT NOT NULL,
      count INTEGER NOT NULL,
      fic TEXT NOT NULL,
      fandom TEXT NOT NULL,
      fic_id INTEGER
    ) STRICT;
    CREATE TABLE IF NOT EXISTS fic (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      fandom TEXT NOT NULL,
      ship TEXT
    ) STRICT;
    CREATE TABLE IF NOT EXISTS goal (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      name TEXT NOT NULL,
      start_date TEXT NOT NULL,
      end_date TEXT,
      fic_id INTEGER,
      fandom TEXT,
      ship TEXT,
      target_word_count INTEGER NOT NULL,
      color TEXT NOT NULL
    ) STRICT;
  `);
  console.log("tables created");
};

export const dropTables = () => {
  console.log("dropping tables");
  db.exec(`
    DROP TABLE IF EXISTS word_count;
    DROP TABLE IF EXISTS fic;
    DROP TABLE IF EXISTS goals;
  `);
};

export const seedTables = () => {
  seedEntries.forEach(insertEntry);
};
