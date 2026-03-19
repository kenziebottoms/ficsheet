import { use } from 'react'
import { RadarChart } from '@mui/x-charts'
import _ from 'lodash'
import { parse } from 'date-fns'

import { DataCacheContext } from '../../../contexts/DataCache/DataCacheContext'
import { DaysOfWeek } from '../../../types'

import Widget from '../../Widget'

import { filterByTimeframe } from './utils'
import type { MonthYearChartProps } from './types'

const DayOfWeekRadar = ({
  timeframe
}: MonthYearChartProps) => {
  const { dailyTotals } = use(DataCacheContext);
  const dailyTotalsByWeekday = _.groupBy(filterByTimeframe(dailyTotals, timeframe), dt => parse(dt.date, 'yyyy-MM-dd', new Date()).getDay());
  const data = DaysOfWeek.map((_day, i) => _.meanBy(dailyTotalsByWeekday[i], 'daily_total') || 0)

  return <Widget title="Day Of Week Average">
    <RadarChart
      series={[{ data, fillArea: true }]}
      radar={{
        metrics: DaysOfWeek.map(name => ({
          name: name.substring(0, 3),
          min: 0,
          max: _.max(data)
        })),
      }}
      height={200}
      width={240}
    />
  </Widget>
}

export default DayOfWeekRadar