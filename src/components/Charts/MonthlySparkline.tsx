import { use } from "react"
import _ from 'lodash'
import { areaElementClasses, SparkLineChart } from "@mui/x-charts"
import { addDays, format } from "date-fns"

import Widget from "../Widget"

import { DataCacheContext } from "../../contexts/DataCache/DataCacheContext"

const MonthlySparkline = () => {
  const { dailyTotals } = use(DataCacheContext)

  const lastThirtyDays = [new Date()]
  for (let i = -1; i > -30; i--) {
    lastThirtyDays.push(addDays(new Date(), i))
  }
  const data = lastThirtyDays.reverse()
    .map(date => format(date, 'yyyy-MM-dd'))
    .map(date => _.find(dailyTotals, { date })?.daily_total || 0);

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