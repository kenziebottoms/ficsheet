import { DatabaseSync } from "node:sqlite";

import type { WordCountEntry } from "../src/types.ts";

export const db = new DatabaseSync(":memory:");

export const insertWordCount = (entry: WordCountEntry) => {
  const { date, count, fic, fandom } = entry;
  const insert = db.prepare(
    `INSERT INTO word_count (date, count, fic, fandom) VALUES (?, ?, ?, ?)`,
  );
  insert.run(date, count, fic, fandom);
};

export function select<TRow>(query: string) {
  const q = db.prepare(`SELECT ${query}`);
  return q.all() as TRow[];
}
