import * as sqlite3 from "sqlite3";

const db = new sqlite3.Database("ficsheet.local.db");

const createTables = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS word_count (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT,
      count INTEGER,
      fic TEXT,
      fandom TEXT
    );
  `);
};

const seedTables = () => {
  db.run(`
    INSERT INTO word_count (date, count, fic, fandom) VALUES ('2026-01-27', 131, 'transception', 'Inception');
    INSERT INTO word_count (date, count, fic, fandom) VALUES ('2026-01-28', 13, 'transception', 'Inception');
    INSERT INTO word_count (date, count, fic, fandom) VALUES ('2026-01-29', 24, 'transception', 'Inception');
    INSERT INTO word_count (date, count, fic, fandom) VALUES ('2026-02-12', 47, 'muzzled max 3', 'Mad Max');
    INSERT INTO word_count (date, count, fic, fandom) VALUES ('2026-02-13', 64, 'muzzled max 3', 'Mad Max');
    INSERT INTO word_count (date, count, fic, fandom) VALUES ('2026-02-14', 133, 'muzzled max 3', 'Mad Max');
  `);
};

export const setup = (seed = false) => {
  createTables();
  if (seed) {
    seedTables();
  }
};
