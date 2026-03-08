import { use } from "react"
import _ from 'lodash'
import { areaElementClasses, SparkLineChart } from "@mui/x-charts"
import { addDays, format } from "date-fns"

import Widget from "../Widget"

import { DataCacheContext } from "../../contexts/DataCache/DataCacheContext"

const WeeklySparkline = () => {
  const { dailyTotals } = use(DataCacheContext)

  const lastSevenDays = [new Date()]
  for (let i = -1; i > -7; i--) {
    lastSevenDays.push(addDays(new Date(), i))
  }
  const data = lastSevenDays
    .map(date => format(date, 'yyyy-MM-dd'))
    .map(date => _.find(dailyTotals, { date })?.daily_total || 0);

  return (
    <Widget title="Weekly Trend">
      <SparkLineChart
        data={data}
        width={200}
        height={60}
        area
        sx={{
          [`& .${areaElementClasses.root}`]: { opacity: 0.2 },
        }}
      />
    </Widget>
  )
}

export default WeeklySparkline