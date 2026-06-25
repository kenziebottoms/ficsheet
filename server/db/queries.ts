import { DatabaseSync } from "node:sqlite";

import type { Fic, WordCountEntry } from "../../src/types.ts";

export const db = new DatabaseSync("ficsheet.sqlite");

export const updateEntry = (entry: WordCountEntry & { id: number }) => {
  const { id, date, count, fic, fandom, ship = null } = entry;
  const insert = db.prepare(
    `UPDATE word_count \
    SET date = ?, count = ?, fic = ?, fandom = ?, ship = ?
    WHERE id = ?;`,
  );
  insert.run(date, count, fic, fandom, ship, id);
};

export const insertEntry = (entry: WordCountEntry) => {
  const { date, count, fic, fandom, ship = null, ficId = null } = entry;
  const insert = db.prepare(
    `INSERT INTO word_count (date, count, fic, fandom, ship, ficId) VALUES (?, ?, ?, ?, ?, ?)`,
  );
  insert.run(date, count, fic, fandom, ship, ficId);
};

export const insertFic = (fic: Fic) => {
  const { name, fandom, ship = null } = fic;
  const insert = db.prepare(
    `INSERT INTO fic (name, fandom, ship) VALUES (?, ?, ?)`,
  );
  insert.run(name, fandom, ship);
};

export const updateFic = (fic: Fic & { id: number }) => {
  const { id, name, fandom, ship = null } = fic;
  const insert = db.prepare(
    `UPDATE fic \
    SET name = ?, fandom = ?, ship = ?
    WHERE id = ?;`,
  );
  insert.run(name, fandom, ship, id);
};

export const deleteEntry = (id: string) => {
  const deleteQuery = db.prepare(`DELETE FROM word_count WHERE id = ?`);
  deleteQuery.run(id);
};
export const deleteFic = (id: string) => {
  const deleteQuery = db.prepare(`DELETE FROM fic WHERE id = ?`);
  deleteQuery.run(id);
};

export const deleteEntriesByYear = (year: string) => {
  const deleteQuery = db.prepare(
    `DELETE FROM word_count ${getYearlyWhereClause(year)}`,
  );
  deleteQuery.run();
};

export function select<TRow>(query: string) {
  console.log(`selecting "${query}"`);
  const q = db.prepare(`SELECT ${query}`);
  return q.all() as TRow[];
}

/** Return a parsed valid positive integer or false given a string? number. */
export const validateYear = (year?: string) => {
  console.log(`validating year ${year}`);
  if (!year) return false;
  const parsedYear = parseInt(year, 10);
  // falsy check covers null, undefined, NaN, 0, negative values
  if (!parsedYear || parsedYear > 2100 || parsedYear < 1900) {
    return false;
  }
  return parsedYear;
};

export const getYearlyWhereClause = (year: string) => {
  const validatedYear = validateYear(year);
  if (!validatedYear) {
    console.warn(`!! omitting where clause for invalid year ${year} !!`);
    return "";
  } else {
    return ` WHERE date BETWEEN '${validatedYear}-01-01' AND '${validatedYear}-12-31' `;
  }
};
