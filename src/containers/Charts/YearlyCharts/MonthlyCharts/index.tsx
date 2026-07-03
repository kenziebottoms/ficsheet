import { use } from "react";
import _ from 'lodash'

import Badge from "@/components/Badge";

import { MonthContext } from "@/contexts/Month/MonthContext";

import { getLongestStreak } from "../utils";

import DailyWordCountStats from "./DailyWordCountStats";
import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import ShipPie from "./ShipPie";

const MonthlyCharts = () => {
  const { filteredDailyTotals } = use(MonthContext)

  return <>
    <div className="flex flex-row flex-wrap gap-3 items-start">
      <Badge title="Total" style="primary">
        <span className='font-semibold text-white'>{_.sumBy(filteredDailyTotals, 'daily_total').toLocaleString("en-US")}</span> words
      </Badge>
      <Badge title="Longest Streak" style="secondary">
        <span className='font-semibold text-white'>{getLongestStreak(filteredDailyTotals, x => x.daily_total !== 0).toLocaleString("en-US")}</span> days
      </Badge>
    </div>

    <div className="flex flex-row flex-wrap gap-3 items-start">
      <DailyWordCountStats />
      <DayOfWeekRadar />
      <FandomPie />
      <ShipPie />
    </div>
  </>
}

export default MonthlyCharts