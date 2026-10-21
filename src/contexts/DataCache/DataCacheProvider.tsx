import { useEffect, useState, type PropsWithChildren } from "react";
import _ from "lodash";

import {
  selectAllWordCounts,
  selectDailyTotals,
  selectFandoms,
  selectFics,
  selectGoals,
  selectRunningTotal,
} from "@/api";
import { type WordCountEntry, type RunningTotal, type DailyTotal, type Fic, type Fandom, type WithId, type Goal } from "@/types";
import { getDatesBetween } from "@/utils";

import { DataCacheContext } from "./DataCacheContext";

type Props = PropsWithChildren & {
  year: number;
}
export const DataCacheProvider = ({ year, children }: Props) => {
  const [fandoms, setFandoms] = useState<Fandom[]>([])
  const [fics, setFics] = useState<WithId<Fic>[]>([])
  const [allFics, setAllFics] = useState<WithId<Fic>[]>([])
  const [goals, setGoals] = useState<WithId<Goal>[]>([])
  const [dailyEntries, setDailyEntries] = useState<WithId<WordCountEntry>[]>([])
  const [dailyTotals, setDailyTotals] = useState<DailyTotal[]>([])
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])

  const refreshData = (y?: number) => {
    selectFandoms(y || year).then(setFandoms)
    selectFics().then(setAllFics)
    selectFics(y || year).then(setFics)
    selectGoals(y || year).then(setGoals)
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
      allFics,
      goals,
      runningTotal,
      refreshData,
    }}>
      {children}
    </DataCacheContext.Provider>
  );
}
