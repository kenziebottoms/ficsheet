import { use, useState } from "react";
import _ from 'lodash'
import { Equalizer, TableChart } from "@mui/icons-material";

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import History from "@/components/History";

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";
import { MonthContext } from "@/contexts/Month/MonthContext";
import { YearContext } from "@/contexts/Year/YearContext";

import { filterByYearAndMonth, getLongestStreak } from "../utils";

import DailyWordCountStats from "./DailyWordCountStats";
import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import RunningTotalLine from "./RunningTotalLine";

const MonthlyCharts = () => {
  const { dailyTotals } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  const [showHistory, setShowHistory] = useState<boolean>(false)

  const totals = filterByYearAndMonth(dailyTotals, year, month)

  return <>
    <div className="flex flex-row gap-3 self-end -mt-15 mb-3 -mr-3">
      <Button
        style={showHistory ? "subtle" : "secondary"}
        onClick={() => setShowHistory(false)}
        icon={Equalizer}
      >
        Charts
      </Button>
      <Button
        style={showHistory ? "secondary" : "subtle"}
        onClick={() => setShowHistory(true)}
        icon={TableChart}
      >
        History
      </Button>
    </div>
    {showHistory ? <History /> : <>
      <div className="flex flex-row flex-wrap gap-3 items-start">
        <Badge title="Total" style="primary">
          <span className='font-semibold text-white'>{_.sumBy(totals, 'daily_total')}</span> words
        </Badge>
        <Badge title="Longest Streak" style="secondary">
          <span className='font-semibold text-white'>{getLongestStreak(totals, x => x.daily_total !== 0)}</span> days
        </Badge>
      </div>
      <DailyWordCountStats />
      <div className="flex flex-row flex-wrap gap-3">
        <FandomPie />
        <RunningTotalLine />
        <DayOfWeekRadar />
      </div>
    </>}
  </>
}

export default MonthlyCharts