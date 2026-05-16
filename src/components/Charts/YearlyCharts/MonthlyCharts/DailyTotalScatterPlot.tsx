import { use } from "react"
import { ScatterChart } from "@mui/x-charts"

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext"
import { MonthContext } from "@/contexts/Month/MonthContext"
import { YearContext } from "@/contexts/Year/YearContext"

import Widget from "@/components/Widget"

import { filterByYearAndMonth } from "../utils"

const DailyTotalScatterPlot = () => {
  const { dailyTotals } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)
  const data = filterByYearAndMonth(dailyTotals, year, month, true).map(({ daily_total }, i) => ({ x: i, y: daily_total }))

  if (data.length === 0) return null;

  return (
    <Widget title="Daily Word Count">
      <ScatterChart
        series={[{ data }]}
        width={month == null ? Math.max(800, data.length) : (data.length * 12)}
        height={200}
      />
    </Widget>
  )
}

export default DailyTotalScatterPlot