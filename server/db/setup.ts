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
      ship TEXT
    ) STRICT;
  `);
};

export const dropTables = () => {
  console.log("dropping tables");
  db.exec(`DROP TABLE IF EXISTS word_count;`);
};

export const seedTables = () => {
  seedEntries.forEach(insertEntry);
};
