import _ from "lodash";

import {
  type WordCountEntry,
  type RunningTotal,
  type DailyTotal,
  type FandomTotal,
  type Timeframe,
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
  body: TRequestBody,
): Promise<TReturnType> {
  return get<TReturnType>(path, {
    method: "POST",
    body: JSON.stringify(body),
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

export const insertEntries = (entries: WordCountEntry[]) =>
  post<WordCountEntry[], WordCountEntry[]>(`entries`, entries);
export const putEntry = (entry: WordCountEntry) =>
  put<WordCountEntry, WordCountEntry>(`entries/${entry.id}`, entry);
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
export const selectFandoms = (year: number) =>
  get<string[]>(`year/${year}/fandoms`);
export const selectFandomTimelines = (year: number) =>
  get<Timeframe[]>(`year/${year}/fandomTimelines`);
export const selectFicTimelines = (year: number) =>
  get<Timeframe[]>(`year/${year}/ficTimelines`);
export const selectFandomTotals = () => get<FandomTotal[]>("fandomTotals");
export const selectRunningTotal = (year?: number) =>
  get<RunningTotal[]>(`${year ? `year/${year}/` : ""}runningTotal`);
export const deleteEntriesByYear = (year: number) =>
  restDelete(`year/${year}/entries`);
export const selectAvailableYears = () => get<number[]>("years");
