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
import FandomTimelineBarChart from "./FandomTimelineBarChart";
import FicTimelineBarChart from "./FicTimelineBarChart";

const MonthlyCharts = () => {
  const { month, filteredDailyTotals, filteredEntries } = use(MonthContext)

  const entriesByFic = _.groupBy(filteredEntries, 'fic')
  const ficTotals = _.map(entriesByFic, (entries, fic) => ({
    fic,
    count: _.sumBy(entries, 'count')
  }))
  const entriesByFandom = _.groupBy(filteredEntries, 'fandom')
  const fandomTotals = _.map(entriesByFandom, (entries, fandom) => ({
    fandom,
    count: _.sumBy(entries, 'count')
  }))
  const entriesByShip = _.omit(_.groupBy(filteredEntries, 'ship'), 'null')
  const shipTotals = _.map(entriesByShip, (entries, ship) => ({
    ship,
    count: _.sumBy(entries, 'count')
  }))

  return <>
    <div className="flex flex-row flex-wrap gap-3 items-stretch">
      <div className="flex flex-row lg:flex-col flex-wrap gap-2 grow">
        <Badge
          title="Total"
          style="primary"
          className="grow"
        >
          <div className='font-semibold text-white text-2xl'>{_.sumBy(filteredDailyTotals, 'daily_total').toLocaleString("en-US")}</div>
          <div className="text-sm">words</div>
        </Badge>
        <Badge
          title={<>Longest<br />Streak</>}
          style="secondary"
          className="grow"
        >
          <span className='font-semibold text-white text-2xl'>{getLongestStreak(filteredDailyTotals, x => x.daily_total !== 0).toLocaleString("en-US")}</span>
          <span className="text-sm"> days</span>
        </Badge>
        <Badge
          title="Rest Days"
          style="subtle"
          className="grow"
        >
          <span className='font-semibold text-white text-2xl'>{_.filter(filteredDailyTotals, x => x.daily_total === 0).length.toLocaleString()}</span>
          <span className="text-sm"> days</span>
        </Badge>
      </div>

      <RunningTotalLine className="grow" />

      <div className="flex flex-row flex-wrap 2xl:flex-col gap-2 items-stretch grow">
        <Badge title="Top Fandom" style="primary" className="grow">
          <div className='font-semibold text-white text-2xl'>{_.maxBy(fandomTotals, 'count')?.fandom}</div>
          <div className="text-sm">{_.maxBy(fandomTotals, 'count')?.count.toLocaleString('en-US')} words written</div>
        </Badge>
        <Badge title="Top Ship" style="secondary" className="grow">
          <div className='font-semibold text-white text-2xl'>{_.maxBy(shipTotals, 'count')?.ship}</div>
          <div className="text-sm">{_.maxBy(shipTotals, 'count')?.count.toLocaleString('en-US')} words written</div>
        </Badge>
        <Badge title="Top Fic" style="subtle" className="grow">
          <div className='font-semibold text-white text-2xl'>{_.maxBy(ficTotals, 'count')?.fic}</div>
          <div className="text-sm">{_.maxBy(ficTotals, 'count')?.count.toLocaleString('en-US')} words written</div>
        </Badge>
      </div>
    </div>

    <div className="flex flex-row flex-wrap gap-3 items-stretch">
      <DailyWordCountStats />
      {month == null && <MonthlyFandomBar />}
      <FandomPie />
      <ShipPie />
      <DayOfWeekRadar />
    </div>

    {month == null && <>
      <FandomTimelineBarChart />
      <FicTimelineBarChart />
    </>}
  </>
}

export default MonthlyCharts