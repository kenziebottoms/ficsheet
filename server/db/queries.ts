import { DatabaseSync } from "node:sqlite";

import {
  type WithId,
  type Fandom,
  type Fic,
  type Ship,
  type WordCountEntry,
} from "../../src/types.ts";

import { validateId } from "../routes/entries.ts";
import { type ApiError } from "../types.ts";

export const db = new DatabaseSync("ficsheet.sqlite");

export const selectEntries = (
  whereClause?: string,
): WithId<WordCountEntry>[] => {
  const entries = select<WithId<WordCountEntry>>(
    `word_count.id, date, fic_id as ficId, IIF(fic_id, fic_table.name, word_count.fic) as fic, IIF(fic_id, fic_table.ship, null) as ship, IIF(fic_id, fic_table.fandom, word_count.fandom) as fandom, count from word_count LEFT JOIN fic as fic_table ON fic_table.id = fic_id ${whereClause ?? ""}`,
  );
  return entries;
};

export const getEntry = (
  id: string | number,
): WithId<WordCountEntry> | null => {
  const entry = selectEntries(`where word_count.id = ${id}`);
  if (entry.length > 0) {
    return entry[0];
  }
  return null;
};

export const updateEntry = (
  entry: WithId<WordCountEntry>,
): WithId<WordCountEntry> => {
  const { id, date, count, fic = "", fandom = "", ficId = null } = entry;
  const insert = db.prepare(
    `UPDATE word_count \
    SET date = ?, count = ?, fic = ?, fandom = ?, fic_id = ? \
    WHERE id = ?;`,
  );
  insert.run(date, count, fic, fandom, ficId, id);
  return entry;
};

export const insertEntry = (entry: WordCountEntry): WithId<WordCountEntry> => {
  const { date, count, fic = "", fandom = "", ficId = null } = entry;
  const insert = db.prepare(
    `INSERT INTO word_count (date, count, fic, fandom, fic_id) VALUES (?, ?, ?, ?, ?)`,
  );
  const result = insert.run(date, count, fic, fandom, ficId);
  return {
    ...entry,
    id: result.lastInsertRowid as number,
  };
};

export const getEntriesByYear = (year?: number | string) =>
  selectEntries(`${getYearlyWhereClause(year)} ORDER BY date ASC`);
export const getFandomsByYear = (year?: number | string) =>
  select<Fandom>(`fic.fandom as name, min(date) as firstWritten, max(date) as lastWritten,
    SUM(count) as totalWordsWritten \
    FROM word_count JOIN fic ON word_count.fic_id = fic.id \
    ${getYearlyWhereClause(year)} GROUP BY fic.fandom ORDER BY fic.fandom ASC`);
export const getFicsByYear = (year?: number | string) =>
  select<WithId<Fic>>(
    `fic.*, min(date) as firstWritten, max(date) as lastWritten,
    SUM(count) as totalWordsWritten \
    FROM word_count JOIN fic ON word_count.fic_id = fic.id \
    ${getYearlyWhereClause(year)} GROUP BY fic.id ORDER BY name ASC`,
  );
export const getAllFics = () =>
  select<WithId<Fic>>(`* FROM fic ORDER BY id ASC`);
export const getAllShips = () =>
  select<Ship>(
    `ship as name, fic.fandom, SUM(count) as totalWordsWritten, min(date) as firstWritten, max(date) as lastWritten \
    from fic JOIN word_count on word_count.fic_id = fic.id WHERE ship NOT null GROUP BY ship ORDER BY totalWordsWritten DESC`,
  );
export const insertFic = (
  fic: Pick<Fic, "name" | "fandom" | "ship">,
): number | null => {
  console.log("inserting fic", fic);
  const { name, fandom, ship = null } = fic;
  const insert = db.prepare(
    `INSERT INTO fic (name, fandom, ship) VALUES (?, ?, ?)`,
  );
  const ficId = insert.run(name, fandom, ship).lastInsertRowid as number;
  return ficId;
};

export const updateFic = (fic: WithId<Fic>): WithId<Fic> => {
  console.log("updating fic", fic);
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

export function select<TRow>(query: string): TRow[] {
  console.log(`selecting "${query}"`);
  const q = db.prepare(`SELECT ${query}`);
  return q.all() as TRow[];
}

/** Return a parsed valid positive integer or false given a string? number. */
export const validateYear = (year?: string | number): number | false => {
  if (!year) return false;
  const parsedYear = parseInt(`${year}`, 10);
  // falsy check covers null, undefined, NaN, 0, negative values
  if (!parsedYear || parsedYear > 2100 || parsedYear < 1900) {
    console.log(`invalid year ${year}`);
    return false;
  }
  return parsedYear;
};

export const getYearlyWhereClause = (year?: string | number): string => {
  // null for no filtering
  if (year == null) return "";
  const validatedYear = validateYear(year);
  if (!validatedYear) {
    console.warn(`!! omitting where clause for invalid year ${year} !!`);
    return "";
  } else {
    return ` WHERE date BETWEEN '${validatedYear}-01-01' AND '${validatedYear}-12-31' `;
  }
};

export const getFicByTitle = (ficTitle?: string): WithId<Fic> | null => {
  if (!ficTitle) return null;
  const ficLookup = select<WithId<Fic>>(
    `* FROM fic WHERE UPPER(name) = '${ficTitle.replace(/\'/g, "''").toUpperCase()}' LIMIT 1;`,
  );
  if (!ficLookup || ficLookup.length === 0) {
    return null;
  }
  return ficLookup[0] ?? null;
};

export const findOrCreateFicForEntry = (
  entry: WordCountEntry,
): number | null => {
  const ficLookup = getFicByTitle(entry.fic);
  if (ficLookup != null) {
    return ficLookup.id;
  }

  if (entry.fic != null && entry.fandom != null) {
    return insertFic({
      name: entry.fic,
      fandom: entry.fandom,
      ship: null,
    });
  }

  return null;
};

export const getFicById = (ficId: string | number): WithId<Fic> | null => {
  const id = validateId(`${ficId}`);
  if (!id) {
    return null;
  }

  const ficLookup = select<WithId<Fic>>(
    `fic.*, min(date) as firstWritten, max(date) as lastWritten,
    SUM(count) as totalWordsWritten \
    FROM word_count JOIN fic ON word_count.fic_id = fic.id WHERE fic.id = ${id}`,
  );

  if (ficLookup && ficLookup.length > 0) return ficLookup[0];

  return null;
};

export const importFicForEntry = (
  entry: WithId<WordCountEntry>,
): WithId<WordCountEntry> | ApiError => {
  const { id } = entry;

  if (entry.ficId != null) {
    return {
      status: 304,
      message: "This entry already has a ficId.",
    };
  }

  if (!entry.fic) {
    return {
      status: 400,
      message: `Entry #${id} has no fic.`,
    };
  }

  const ficId = findOrCreateFicForEntry(entry);

  if (ficId != null) {
    const newEntry = {
      ...entry,
      ficId,
    };
    updateEntry(newEntry);
    return newEntry;
  } else {
    return {
      status: 500,
      message: "Failed to create fic.",
    };
  }
};
