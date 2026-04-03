import _ from "lodash";

import {
  type WordCountEntry,
  type RunningTotal,
  type DailyTotal,
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

export const insertWordCounts = (entries: WordCountEntry[]) =>
  post<{ entries: WordCountEntry[] }, WordCountEntry[]>(`entries`, { entries });
export const selectAllWordCounts = (year: number) =>
  get<WordCountEntry[]>(`year/${year}/entries`);
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
export const selectRunningTotal = (year: number) =>
  get<RunningTotal[]>(`year/${year}/runningTotal`);
export const selectAvailableYears = () => get<number[]>("years");
