import { use } from "react";
import _ from 'lodash'

import Badge from "@/components/Badge";

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";
import { MonthContext } from "@/contexts/Month/MonthContext";
import { YearContext } from "@/contexts/Year/YearContext";

import { filterByYearAndMonth, getLongestStreak } from "../utils";

import DailyWordCountStats from "./DailyWordCountStats";
import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import RunningTotalLine from "./RunningTotalLine";
import FicLeaderboard from "./FicLeaderboard";

const MonthlyCharts = () => {
  const { dailyTotals } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  const totals = filterByYearAndMonth(dailyTotals, year, month)

  return <>
    <div className="flex flex-row flex-wrap gap-3 items-start">
      <Badge title="Total" style="primary">
        <span className='font-semibold text-white'>{_.sumBy(totals, 'daily_total')}</span> words
      </Badge>
      <Badge title="Longest Streak" style="secondary">
        <span className='font-semibold text-white'>{getLongestStreak(totals, x => x.daily_total !== 0)}</span> days
      </Badge>
    </div>

    <div className="flex flex-row flex-wrap gap-3 items-start">
      <FicLeaderboard />
    </div>

    <DailyWordCountStats />

    <div className="flex flex-row flex-wrap gap-3">
      <FandomPie />
      <RunningTotalLine />
      <DayOfWeekRadar />
    </div>
  </>
}

export default MonthlyCharts