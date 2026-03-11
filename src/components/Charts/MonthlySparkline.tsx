import { use } from "react"
import { areaElementClasses, SparkLineChart } from "@mui/x-charts"

import { DataCacheContext } from "../../contexts/DataCache/DataCacheContext"

import Widget from "../Widget"

const MonthlySparkline = () => {
  const { dailyTotals } = use(DataCacheContext)
  const data = dailyTotals.map(dt => dt.daily_total).slice(dailyTotals.length - 30, dailyTotals.length - 1)

  return (
    <Widget title="Daily Word Count" subtitle="Last 30 Days">
      <SparkLineChart
        data={data}
        width={240}
        height={60}
        area
        sx={{
          [`& .${areaElementClasses.root}`]: { opacity: 0.2 },
        }}
      />
    </Widget>
  )
}

export default MonthlySparkline