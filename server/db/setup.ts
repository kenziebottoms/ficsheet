import { db, insertEntry } from "./queries.ts";
import seedEntries from "./seedData.ts";

export const createTables = () => {
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

export const seedTables = () => {
  seedEntries.forEach(insertEntry);
};
