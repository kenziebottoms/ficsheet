import { use } from "react"
import { areaElementClasses, SparkLineChart } from "@mui/x-charts"

import { DataCacheContext } from "contexts/DataCache/DataCacheContext"
import { MonthContext } from "contexts/Month/MonthContext"
import { YearContext } from "contexts/Year/YearContext"

import Widget from "components/Widget"

import { filterByYearAndMonth } from "../utils"

const DailyTotalSparkline = () => {
  const { dailyTotals } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)
  const data = filterByYearAndMonth(dailyTotals, year, month, true).map(dt => dt.daily_total)

  return (
    <Widget title="Daily Word Count">
      <SparkLineChart
        data={data}
        width={month == null ? Math.max(800, data.length) : (data.length * 12)}
        height={60}
        area
        sx={{
          [`& .${areaElementClasses.root}`]: { opacity: 0.2 },
        }}
      />
    </Widget>
  )
}

export default DailyTotalSparkline