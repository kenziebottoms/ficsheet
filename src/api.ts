import _ from "lodash";

import {
  type WordCountEntry,
  type RunningTotal,
  type DailyTotal,
  type Fic,
  type Fandom,
  type WithId,
  type Ship,
} from "@/types";

import { getDatesBetween } from "./utils";

const API_URL = "http://localhost:2000/api";

const GlobalHeaders = new Headers();
GlobalHeaders.set("Content-Type", "application/json");

async function get<TReturnType>(
  path: string,
  options?: Partial<RequestInit>,
): Promise<TReturnType> {
  const response: Response = await fetch(`${API_URL}/${path}`, {
    headers: GlobalHeaders,
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();
  return result as TReturnType;
}

async function post<TRequestBody, TReturnType>(
  path: string,
  body?: TRequestBody,
): Promise<TReturnType> {
  return get<TReturnType>(path, {
    method: "POST",
    body: body == null ? undefined : JSON.stringify(body),
  });
}
async function put<TRequestBody, TReturnType>(
  path: string,
  body: TRequestBody,
): Promise<TReturnType> {
  return get<TReturnType>(path, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
async function restDelete(path: string): Promise<null> {
  return get(path, {
    method: "DELETE",
  });
}

export const exportData = (year: number) =>
  get<{ entries: WithId<WordCountEntry>[]; fics: WithId<Fic>[] }>(
    `year/${year}/export`,
  );
export const insertEntries = (entries: WordCountEntry[]) =>
  post<WordCountEntry[], WithId<WordCountEntry>[]>(`entries`, entries);
export const putEntry = (entry: WithId<WordCountEntry>) =>
  put<WithId<WordCountEntry>, WithId<WordCountEntry>>(
    `entries/${entry.id}`,
    entry,
  );
export const processFandom = (entryId: number) =>
  post<never, WithId<WordCountEntry>>(`entries/${entryId}/processFandom`);
export const processFandomsForYear = (year: number) =>
  post<never, WithId<WordCountEntry>[]>(`year/${year}/entries/processFandoms`);
export const deleteEntry = (id: number) => restDelete(`entries/${id}`);
export const selectAllWordCounts = (year?: number) =>
  get<WordCountEntry[]>(`${year ? `year/${year}/` : ""}entries`);
export const selectDailyTotals = (year: number) =>
  get<DailyTotal[]>(`year/${year}/dailyTotals`).then((nonEmptyDailyTotals) =>
    getDatesBetween(new Date(year, 0, 1), new Date(year, 11, 31)).map(
      (date) => ({
        date,
        daily_total: _.find(nonEmptyDailyTotals, { date })?.daily_total || 0,
      }),
    ),
  );
export const selectFandoms = (year?: number) =>
  get<Fandom[]>(`${year ? `year/${year}/` : ""}fandoms`);
export const selectShips = () => get<Ship[]>(`ships`);
export const insertFics = (fics: Fic[]) => post<Fic[], Fic[]>(`fics`, fics);
export const putFic = (fic: Fic) => put<Fic, Fic>(`fics/${fic.id}`, fic);
export const selectFics = (year?: number) =>
  get<WithId<Fic>[]>(`${year ? `year/${year}/` : ""}fics`);
export const deleteFic = (id: number) => restDelete(`fics/${id}`);

export const selectRunningTotal = (year?: number) =>
  get<RunningTotal[]>(`${year ? `year/${year}/` : ""}runningTotal`);
export const deleteEntriesByYear = (year: number) =>
  restDelete(`year/${year}/entries`);
export const selectAvailableYears = () => get<number[]>("years");
