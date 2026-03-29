import { use } from 'react'
import { RadarChart } from '@mui/x-charts'
import _ from 'lodash'
import { parse } from 'date-fns'

import { DataCacheContext } from 'contexts/DataCache/DataCacheContext'
import { MonthContext } from 'contexts/Month/MonthContext'
import { YearContext } from 'contexts/Year/YearContext'

import { DaysOfWeek } from '../../../../types'

import Widget from 'components/Widget'

import { filterByYearAndMonth } from '../utils'

const DayOfWeekRadar = () => {
  const { dailyTotals } = use(DataCacheContext);
  const { year } = use(YearContext)
  const { month } = use(MonthContext)
  const dailyTotalsByWeekday = _.groupBy(filterByYearAndMonth(dailyTotals, year, month, true), dt => parse(dt.date, 'yyyy-MM-dd', new Date()).getDay());
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