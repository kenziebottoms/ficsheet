import { DatabaseSync } from "node:sqlite";

import type { Fic, WordCountEntry } from "../../src/types.ts";

export const db = new DatabaseSync("ficsheet.sqlite");

export const getEntry = (id: string | number): WordCountEntry | null => {
  const entry = select<WordCountEntry>(
    `id, date, fic, fandom, fic_id as ficId, count from word_count where id = ${id}`,
  );
  if (entry) {
    return entry[0];
  }
  return null;
};

export const updateEntry = (
  entry: WordCountEntry & { id: number },
): WordCountEntry & { id: number } => {
  const { id, date, count, fic, fandom, ficId = null } = entry;
  const insert = db.prepare(
    `UPDATE word_count \
    SET date = ?, count = ?, fic = ?, fandom = ?, fic_id = ? \
    WHERE id = ?;`,
  );
  insert.run(date, count, fic, fandom, ficId, id);
  return entry;
};

export const insertEntry = (
  entry: WordCountEntry,
): WordCountEntry & { id: number } => {
  const { date, count, fic, fandom, ficId = null } = entry;
  const insert = db.prepare(
    `INSERT INTO word_count (date, count, fic, fandom, fic_id) VALUES (?, ?, ?, ?, ?)`,
  );
  const result = insert.run(date, count, fic, fandom, ficId);
  return {
    id: result.lastInsertRowid as number,
    ...entry,
  };
};

export const insertFic = (fic: Fic): Fic & { id: number } => {
  const { name, fandom, ship = null } = fic;
  const insert = db.prepare(
    `INSERT INTO fic (name, fandom, ship) VALUES (?, ?, ?)`,
  );
  const result = insert.run(name, fandom, ship);
  return {
    id: result.lastInsertRowid as number,
    ...fic,
  };
};

export const updateFic = (fic: Fic & { id: number }): Fic & { id: number } => {
  const { id, name, fandom, ship = null } = fic;
  const insert = db.prepare(
    `UPDATE fic \
    SET name = ?, fandom = ?, ship = ?
    WHERE id = ?;`,
  );
  insert.run(name, fandom, ship, id);
  return fic;
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

export const getFicByTitle = (ficTitle: string): Fic | null => {
  if (!ficTitle) return null;
  const ficLookup = select<Fic & { id: number }>(
    `* FROM fic WHERE UPPER(name) = '${ficTitle.toUpperCase()}' LIMIT 1;`,
  );
  if (!ficLookup || ficLookup.length === 0) {
    return null;
  }
  return ficLookup[0] ?? null;
};
