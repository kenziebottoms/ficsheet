import { use, } from "react"
import { BarChart, barClasses, } from "@mui/x-charts"
import _ from 'lodash'

import Widget from "@/components/Widget"

import { MonthContext } from "@/contexts/Month/MonthContext"
import { computeHistogramBins } from "@/utils"

const DailyWordCountHistogram = ({
  className = ''
}: {
  className?: string;
}) => {
  const { filteredDailyTotals } = use(MonthContext)

  const dataset = computeHistogramBins(_.map(filteredDailyTotals, 'daily_total'), 10)

  if (dataset.length === 0) return null;

  return (
    <Widget title="Histogram" className={`flex flex-col ${className}`}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            dataKey: 'bin',
            scaleType: 'band',
            categoryGapRatio: 0,
            barGapRatio: 0,
            tickLabelStyle: { fontSize: 10 },
          },
        ]}
        yAxis={[{ width: 50 }]}
        series={[{ dataKey: 'count' }]}
        height={300}
        width={500}
        sx={{ [`& .${barClasses.root}`]: { shapeRendering: 'crispEdges' } }}
      />
    </Widget>
  )
}

export default DailyWordCountHistogram