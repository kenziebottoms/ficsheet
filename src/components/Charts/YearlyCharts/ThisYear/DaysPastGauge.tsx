import { Gauge } from "@mui/x-charts"
import { getDayOfYear, isLeapYear } from "date-fns"

import Widget from "@/components/Widget"

const DaysPastGauge = () => {
  const year = new Date().getFullYear()
  const daysPast = getDayOfYear(new Date())

  return <Widget title="Days past">
    <Gauge
      width={100}
      height={100}
      valueMin={0}
      valueMax={isLeapYear(year) ? 366 : 365}
      value={daysPast}
    />
  </Widget>
}

export default DaysPastGauge