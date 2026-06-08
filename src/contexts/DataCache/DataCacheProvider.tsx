import { useEffect, useState, type PropsWithChildren } from "react";

import {
  selectAllWordCounts,
  selectDailyTotals,
  selectFandoms,
  selectFandomTimelines,
  selectRunningTotal,
} from "@/api";
import { type WordCountEntry, type RunningTotal, type DailyTotal, type FandomTimeline } from "@/types";

import { DataCacheContext } from "./DataCacheContext";

type Props = PropsWithChildren & {
  year: number;
}
export const DataCacheProvider = ({ year, children }: Props) => {
  const [fandoms, setFandoms] = useState<string[]>([])
  const [fandomTimelines, setFandomTimelines] = useState<FandomTimeline[]>([])
  const [dailyEntries, setDailyEntries] = useState<WordCountEntry[]>([])
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([])
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])

  const refreshData = (year: number) => {
    selectFandoms(year).then(setFandoms)
    selectAllWordCounts(year).then(setDailyEntries)
    selectDailyTotals(year).then(setDailyTotals)
    selectRunningTotal(year).then(setRunningTotal)
    selectFandomTimelines(year).then(setFandomTimelines)
  }

  useEffect(() => {
    refreshData(year)
  }, [year])

  return (
    <DataCacheContext.Provider value={{
      dailyEntries,
      dailyTotals,
      fandoms,
      fandomTimelines,
      runningTotal,
      refreshData,
    }}>
      {children}
    </DataCacheContext.Provider>
  );
}
