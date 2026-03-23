import _ from "lodash";

import {
  type WordCountEntry,
  type RunningTotal,
  type DailyTotal,
} from "../src/types";

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

export const selectAllWordCounts = () => get<WordCountEntry[]>("entries");
export const selectDailyTotals = (year: number) =>
  get<DailyTotal[]>(`dailyTotals?year=${year}`).then((nonEmptyDailyTotals) =>
    getDatesBetween(new Date(year, 0, 1), new Date(year, 11, 31)).map(
      (date) => ({
        date,
        daily_total: _.find(nonEmptyDailyTotals, { date })?.daily_total || 0,
      }),
    ),
  );
export const selectRunningTotal = () => get<RunningTotal[]>("runningTotal");
