import { useEffect, useState, type PropsWithChildren } from "react";

import { selectAllWordCounts, selectDailyTotals, selectRunningTotal } from "@/api";
import type { WordCountEntry, RunningTotal, DailyTotal } from "@/types";

import { DataCacheContext } from "./DataCacheContext";

type Props = PropsWithChildren & {
  year: number;
}
export const DataCacheProvider = ({ year, children }: Props) => {
  const [dailyEntries, setDailyEntries] = useState<WordCountEntry[]>([])
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([])
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])

  const refreshData = (year: number = new Date().getFullYear()) => {
    selectAllWordCounts(year).then(setDailyEntries)
    selectDailyTotals(year).then(setDailyTotals)
    selectRunningTotal(year).then(setRunningTotal)
  }

  useEffect(() => {
    refreshData(year)
  }, [year])

  return (
    <DataCacheContext.Provider value={{
      dailyEntries,
      dailyTotals,
      runningTotal,
      refreshData,
    }}>
      {children}
    </DataCacheContext.Provider>
  );
}
