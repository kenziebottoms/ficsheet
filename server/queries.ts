import { DatabaseSync } from "node:sqlite";

import type { WordCountEntry } from "../src/types.ts";

export const db = new DatabaseSync("ficsheet.sqlite");

export const insertWordCount = (entry: WordCountEntry) => {
  const { date, count, fic, fandom } = entry;
  const insert = db.prepare(
    `INSERT INTO word_count (date, count, fic, fandom) VALUES (?, ?, ?, ?)`,
  );
  insert.run(date, count, fic, fandom);
};

export function select<TRow>(query: string) {
  console.log(`selecting "${query}"`);
  const q = db.prepare(`SELECT ${query}`);
  return q.all() as TRow[];
}

export const getYearlyWhereClause = (year: string) => {
  const validatedYear = parseInt(year, 10);
  if (isNaN(validatedYear)) {
    return "";
  } else {
    return ` WHERE date BETWEEN '${validatedYear}-01-01' AND '${validatedYear}-12-31' `;
  }
};
