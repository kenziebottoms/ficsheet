import { use } from "react"
import { areaElementClasses, SparkLineChart } from "@mui/x-charts"

import { DataCacheContext } from "../../../contexts/DataCache/DataCacheContext"

import Widget from "../../Widget"

import { filterByTimeframe } from "./utils"
import type { MonthYearChartProps } from "./types"

const DailyTotalSparkline = ({
  timeframe
}: MonthYearChartProps) => {
  const { dailyTotals } = use(DataCacheContext)
  const data = filterByTimeframe(dailyTotals, timeframe).map(dt => dt.daily_total)

  return (
    <Widget title="Daily Word Count">
      <SparkLineChart
        data={data}
        width={timeframe.period === 'monthly' ? 300 : 500}
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