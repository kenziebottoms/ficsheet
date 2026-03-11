import { use } from 'react'
import { RadarChart } from '@mui/x-charts'
import _ from 'lodash'

import { DataCacheContext } from '../../contexts/DataCache/DataCacheContext'

import Widget from '../Widget'
import { parse } from 'date-fns'
import { DaysOfWeek } from '../../types'
import { filterByTimeframe } from './utils'

// TODO: populate 0-day totals
const DayOfWeekRadar = () => {
  const { timeframe, dailyTotals } = use(DataCacheContext);
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