import { useEffect, useState, type PropsWithChildren } from "react";
import _ from "lodash";

import {
  selectAllWordCounts,
  selectDailyTotals,
  selectFandoms,
  selectFics,
  selectRunningTotal,
} from "@/api";
import { type WordCountEntry, type RunningTotal, type DailyTotal, type Fic, type Fandom, type WithId } from "@/types";
import { getDatesBetween } from "@/utils";

import { DataCacheContext } from "./DataCacheContext";

type Props = PropsWithChildren & {
  year: number;
}
export const DataCacheProvider = ({ year, children }: Props) => {
  const [fandoms, setFandoms] = useState<Fandom[]>([])
  const [fics, setFics] = useState<WithId<Fic>[]>([])
  const [dailyEntries, setDailyEntries] = useState<WithId<WordCountEntry>[]>([])
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([])
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])

  const refreshData = (y?: number) => {
    selectFandoms(y || year).then(setFandoms)
    selectFics(y || year).then(setFics)
    selectAllWordCounts(y || year).then(setDailyEntries)
    selectDailyTotals(y || year).then(setDailyTotals)
    selectRunningTotal(y || year).then(nonEmptyRunningTotals => {
      const dates: string[] = getDatesBetween(new Date(year, 0, 1), new Date(year, 11, 31));
      const filledOutRunningTotals: RunningTotal[] = []
      dates.forEach(date => {
        const matchingRunningTotal = _.find(nonEmptyRunningTotals, { date })
        if (matchingRunningTotal != null) {
          filledOutRunningTotals.push(matchingRunningTotal)
        } else {
          filledOutRunningTotals.push({
            date,
            running_total: filledOutRunningTotals[filledOutRunningTotals.length - 1]?.running_total || 0
          })
        }
      })
      setRunningTotal(filledOutRunningTotals);
    })
  }

  useEffect(() => {
    refreshData(year)
  }, [year])

  return (
    <DataCacheContext.Provider value={{
      dailyEntries,
      dailyTotals,
      fandoms,
      fics,
      runningTotal,
      refreshData,
    }}>
      {children}
    </DataCacheContext.Provider>
  );
}
