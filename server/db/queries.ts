import { DatabaseSync } from "node:sqlite";

import type { WithId, WordCountEntry } from "../../src/types.ts";

export const db = new DatabaseSync("ficsheet.sqlite");

export const updateEntry = (
  entry: WithId<WordCountEntry>,
): WithId<WordCountEntry> => {
  const { id, date, count, fic, fandom, ship = null } = entry;
  const insert = db.prepare(
    `UPDATE word_count \
    SET date = ?, count = ?, fic = ?, fandom = ?, ship = ?
    WHERE id = ?;`,
  );
  insert.run(date, count, fic, fandom, ship, id);
  return entry;
};

export const insertEntry = (entry: WordCountEntry): WithId<WordCountEntry> => {
  const { date, count, fic, fandom, ship = null } = entry;
  const insert = db.prepare(
    `INSERT INTO word_count (date, count, fic, fandom, ship) VALUES (?, ?, ?, ?, ?)`,
  );
  const result = insert.run(date, count, fic, fandom, ship);
  return {
    ...entry,
    id: result.lastInsertRowid as number,
  };
};

export const deleteEntry = (id: string) => {
  const deleteQuery = db.prepare(`DELETE FROM word_count WHERE id = ?`);
  deleteQuery.run(id);
};

export const deleteEntriesByYear = (year: string) => {
  const deleteQuery = db.prepare(
    `DELETE FROM word_count ${getYearlyWhereClause(year)}`,
  );
  deleteQuery.run();
};

export function select<TRow>(query: string): TRow[] {
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
