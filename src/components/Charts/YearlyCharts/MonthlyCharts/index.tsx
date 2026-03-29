import { use, useState } from "react";
import _ from 'lodash'

import Badge from "@/components/Badge";
import Button from "@/components/Button";
import History from "@/components/History";

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";
import { MonthContext } from "@/contexts/Month/MonthContext";
import { YearContext } from "@/contexts/Year/YearContext";

import { filterByYearAndMonth } from "../utils";

import DailyWordCountStats from "./DailyWordCountStats";
import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import RunningTotalLine from "./RunningTotalLine";

const MonthlyCharts = () => {
  const { dailyTotals } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  const [editMode, setEditMode] = useState<boolean>(false)

  const totals = filterByYearAndMonth(dailyTotals, year, month)

  return <>
    <Button
      style={editMode ? "primary" : "secondary"}
      onClick={() => setEditMode(!editMode)}
      className='self-end -mb-12'
    >
      Edit
    </Button>
    {editMode ? <History /> : <>
      <div className="flex flex-col gap-3 items-start">
        <Badge title="Total" style="primary">
          <span className='font-semibold text-white'>{_.sumBy(totals, 'daily_total')}</span> words
        </Badge>
        <DailyWordCountStats />
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        <FandomPie />
        <RunningTotalLine />
        <DayOfWeekRadar />
      </div>
    </>}
  </>
}

export default MonthlyCharts