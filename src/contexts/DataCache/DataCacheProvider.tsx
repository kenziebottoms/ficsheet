import { useEffect, useState, type PropsWithChildren } from "react";

import { selectAllWordCounts, selectDailyTotals, selectRunningTotal } from "../../api";
import type { WordCountEntry, RunningTotal, Timeframe, DailyTotal } from "../../types";

import { DataCacheContext } from "./DataCacheContext";

export const DataCacheProvider = ({ children }: PropsWithChildren) => {
  const [dailyEntries, setDailyEntries] = useState<WordCountEntry[]>([])
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([])
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])
  const [timeframe, setTimeframe] = useState<Timeframe>(new Date().getFullYear())

  useEffect(() => {
    selectAllWordCounts().then(setDailyEntries)
    selectDailyTotals().then(setDailyTotals)
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
