import { use, useState } from "react"
import { ScatterChart } from "@mui/x-charts"

import Toggle from '@/components/Toggle'
import Widget from "@/components/Widget"

import { MonthContext } from "@/contexts/Month/MonthContext"

import { colors } from "../../constants"

const DailyWordCountScatterPlot = ({
  className = ''
}: {
  className?: string;
}) => {
  const { month, filteredDailyTotals } = use(MonthContext)

  const [showZero, setShowZero] = useState<boolean>(true)

  const data = filteredDailyTotals.slice(0, -1)
    .map(({ daily_total, date }, i) => ({
      x: i,
      y: daily_total,
      label: date,
      id: date,
    }))
    .filter(({ y }) => showZero || y !== 0)

  if (data.length === 0) return null;

  return (
    <Widget title="Daily Word Count" className={`flex flex-col ${className}`}>
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