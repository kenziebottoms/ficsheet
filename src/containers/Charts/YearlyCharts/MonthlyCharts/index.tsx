import { use } from "react";
import _ from 'lodash'

import Badge from "@/components/Badge";

import { MonthContext } from "@/contexts/Month/MonthContext";

import { getLongestStreak } from "../utils";

import DailyWordCountStats from "./DailyWordCountStats";
import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import MonthlyFandomBar from "./MonthlyFandomBar";
import RunningTotalLine from "./RunningTotalLine";
import ShipPie from "./ShipPie";

const MonthlyCharts = () => {
  const { month, filteredDailyTotals, filteredEntries } = use(MonthContext)

  const entriesByFic = _.groupBy(filteredEntries, 'fic')
  const ficTotals = _.map(entriesByFic, (entries, fic) => ({
    fic,
    count: _.sumBy(entries, 'count')
  }))

  return <>
    <div className="flex flex-row flex-wrap gap-3 items-start">
      <div className="flex flex-col gap-2">
        <Badge title="Total" style="primary">
          <span className='font-semibold text-white'>{_.sumBy(filteredDailyTotals, 'daily_total').toLocaleString("en-US")}</span> words
        </Badge>
        <Badge title="Longest Streak" style="secondary">
          <span className='font-semibold text-white'>{getLongestStreak(filteredDailyTotals, x => x.daily_total !== 0).toLocaleString("en-US")}</span> days
        </Badge>
        <Badge title="Most Worked On" style="subtle">
          <div>
            <div className='font-semibold text-white'>{_.maxBy(ficTotals, 'count')?.fic}</div>
            <div className="text-sm">{_.maxBy(ficTotals, 'count')?.count.toLocaleString('en-US')} words written</div>
          </div>
        </Badge>
      </div>
      <RunningTotalLine />
    </div>

    <div className="flex flex-row flex-wrap gap-3 items-start">
      <DailyWordCountStats />
      {month == null && <MonthlyFandomBar />}
      <DayOfWeekRadar />
      <FandomPie />
      <ShipPie />
    </div >
  </>
}

export default MonthlyCharts