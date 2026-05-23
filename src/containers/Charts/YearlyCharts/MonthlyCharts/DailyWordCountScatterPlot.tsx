import { use, useState } from "react"
import { ScatterChart } from "@mui/x-charts"

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext"
import { MonthContext } from "@/contexts/Month/MonthContext"
import { YearContext } from "@/contexts/Year/YearContext"

import Toggle from '@/components/Toggle'
import Widget from "@/components/Widget"

import { filterByYearAndMonth } from "../utils"
import { colors } from "../../constants"

const DailyWordCountScatterPlot = () => {
  const { dailyTotals } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  const [showZero, setShowZero] = useState<boolean>(true)

  const data = filterByYearAndMonth(dailyTotals, year, month, true)
    .map(({ daily_total, date }, i) => ({
      x: i,
      y: daily_total,
      label: date,
      id: date,
    }))
    .filter(({ y }) => showZero || y !== 0)

  if (data.length === 0) return null;

  return (
    <Widget title="Daily Word Count" className="flex flex-col">
      <Toggle
        label="Show 0"
        value={showZero}
        onChange={setShowZero}
        className="self-end -mt-8"
      />
      <ScatterChart
        series={[{ data, markerSize: 2 }]}
        colors={[colors[2]]}
        // 375px is the min required to show the widget title and toggle on the same line
        width={month == null ? 800 : 375}
        height={300}
      />
    </Widget>
  )
}

export default DailyWordCountScatterPlot