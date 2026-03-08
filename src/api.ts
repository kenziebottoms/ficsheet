import {
  type WordCountEntry,
  type RunningTotal,
  type DailyTotal,
} from "../src/types";

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
export const selectDailyTotals = () => get<DailyTotal[]>("dailyTotals");
export const selectRunningTotal = () => get<RunningTotal[]>("runningTotal");
