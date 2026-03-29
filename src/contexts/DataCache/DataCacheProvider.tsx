import { useEffect, useState, type PropsWithChildren } from "react";

import {
  selectAllWordCounts,
  selectDailyTotals,
  selectFandoms,
  selectRunningTotal,
} from "@/api";
import type { WordCountEntry, RunningTotal, DailyTotal } from "@/types";

import { DataCacheContext } from "./DataCacheContext";

type Props = PropsWithChildren & {
  year: number;
}
export const DataCacheProvider = ({ year, children }: Props) => {
  const [fandoms, setFandoms] = useState<string[]>([])
  const [dailyEntries, setDailyEntries] = useState<WordCountEntry[]>([])
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([])
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])

  const refreshData = (year: number = new Date().getFullYear()) => {
    selectFandoms(year).then(setFandoms)
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
      fandoms,
      runningTotal,
      refreshData,
    }}>
      {children}
    </DataCacheContext.Provider>
  );
}
