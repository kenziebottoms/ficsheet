import { useEffect, useState, type PropsWithChildren } from "react";

import { selectAllWordCounts, selectDailyTotals, selectRunningTotal } from "../../api";
import type { WordCountEntry, RunningTotal, DailyTotal } from "../../types";

import { DataCacheContext } from "./DataCacheContext";

export const DataCacheProvider = ({ children }: PropsWithChildren) => {
  const [dailyEntries, setDailyEntries] = useState<WordCountEntry[]>([])
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([])
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])

  const thisYear = new Date().getFullYear();

  useEffect(() => {
    selectAllWordCounts().then(setDailyEntries)
    selectDailyTotals(thisYear).then(setDailyTotals)
    selectRunningTotal().then(setRunningTotal)
  }, [thisYear])

  return (
    <DataCacheContext.Provider value={{
      dailyEntries,
      dailyTotals,
      runningTotal,
    }}>
      {children}
    </DataCacheContext.Provider>
  );
}
