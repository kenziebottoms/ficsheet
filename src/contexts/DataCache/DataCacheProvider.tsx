import { useEffect, useState, type PropsWithChildren } from "react";

import { selectAllWordCounts, selectRunningTotal } from "../../api";
import type { WordCountEntry, RunningTotal, Timeframe } from "../../types";

import { DataCacheContext } from "./DataCacheContext";

export const DataCacheProvider = ({ children }: PropsWithChildren) => {
  const [dailyEntries, setDailyEntries] = useState<WordCountEntry[]>([])
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])
  const [timeframe, setTimeframe] = useState<Timeframe>(new Date().getFullYear())

  useEffect(() => {
    selectAllWordCounts().then(setDailyEntries)
    selectRunningTotal().then(setRunningTotal)
  }, [])

  return (
    <DataCacheContext.Provider value={{
      dailyEntries,
      runningTotal,
      timeframe,
      setTimeframe,
    }}>
      {children}
    </DataCacheContext.Provider>
  );
}
