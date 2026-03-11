import { useEffect, useState, type PropsWithChildren } from "react";
import _ from 'lodash'

import { selectAllWordCounts, selectDailyTotals, selectRunningTotal } from "../../api";
import type { WordCountEntry, RunningTotal, Timeframe, DailyTotal } from "../../types";
import { getDatesBetween } from "../../utils";

import { DataCacheContext } from "./DataCacheContext";

export const DataCacheProvider = ({ children }: PropsWithChildren) => {
  const [dailyEntries, setDailyEntries] = useState<WordCountEntry[]>([])
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([])
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])
  const [timeframe, setTimeframe] = useState<Timeframe>(new Date().getFullYear())

  useEffect(() => {
    selectAllWordCounts().then(setDailyEntries)
    selectDailyTotals().then(nonEmptyDailyTotals => {
      const totals = getDatesBetween(new Date(new Date().getFullYear(), 0, 1), new Date())
        .map(date => ({
          date,
          daily_total: _.find(nonEmptyDailyTotals, { date })?.daily_total || 0
        }))
      setDailyTotals(totals);
    })
    selectRunningTotal().then(setRunningTotal)
  }, [])

  return (
    <DataCacheContext.Provider value={{
      dailyEntries,
      dailyTotals,
      runningTotal,
      timeframe,
      setTimeframe,
    }}>
      {children}
    </DataCacheContext.Provider>
  );
}
