import _ from "lodash";

import {
  type WordCountEntry,
  type RunningTotal,
  type DailyTotal,
} from "@/types";

import { getDatesBetween } from "./utils";

const API_URL = "http://localhost:2000";

const GlobalHeaders = new Headers();
GlobalHeaders.set("Content-Type", "application/json");

const get = <TReturnType>(path: string): Promise<TReturnType> =>
  new Promise((resolve, reject) =>
    fetch(`${API_URL}/${path}`, {
      headers: GlobalHeaders,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return reject(new Error(response.statusText));
        }
      })
      .then((json) => resolve(json as TReturnType))
      .catch((err) => reject(err)),
  );

const post = <TReturnType>(path: string, body: object): Promise<TReturnType> =>
  new Promise((resolve, reject) =>
    fetch(`${API_URL}/${path}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "multipart/form-data",
      }),
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return reject(new Error(response.statusText));
        }
      })
      .then((json) => resolve(json as TReturnType))
      .catch((err) => reject(err)),
  );
export const insertWordCounts = (entries: WordCountEntry[]) =>
  post(`entries`, { entries });
export const selectAllWordCounts = (year: number) =>
  get<WordCountEntry[]>(`entries?year=${year}`);
export const selectDailyTotals = (year: number) =>
  get<DailyTotal[]>(`dailyTotals?year=${year}`).then((nonEmptyDailyTotals) =>
    getDatesBetween(new Date(year, 0, 1), new Date(year, 11, 31)).map(
      (date) => ({
        date,
        daily_total: _.find(nonEmptyDailyTotals, { date })?.daily_total || 0,
      }),
    ),
  );
export const selectRunningTotal = (year: number) =>
  get<RunningTotal[]>(`runningTotal?year=${year}`);
export const selectAvailableYears = () => get<number[]>("years");
