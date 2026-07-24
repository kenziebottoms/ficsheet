import { use } from 'react'
import { RadarChart } from '@mui/x-charts'
import _ from 'lodash'
import { parse } from 'date-fns'

import { MonthContext } from '@/contexts/Month/MonthContext'

import { DaysOfWeek } from '@/types'

import Widget from '@/components/Widget'

const DayOfWeekRadar = ({
  className = ''
}) => {
  const { filteredDailyTotals } = use(MonthContext)
  const dailyTotalsByWeekday = _.groupBy(filteredDailyTotals, dt => parse(dt.date, 'yyyy-MM-dd', new Date()).getDay());
  const data = DaysOfWeek.map((_day, i) => _.meanBy(dailyTotalsByWeekday[i], 'daily_total') || 0)

  return <Widget title="Day Of Week Average" className={className}>
    <RadarChart
      series={[{ data, fillArea: true }]}
      radar={{
        metrics: DaysOfWeek.map(name => ({
          name: name.substring(0, 3),
          min: 0,
          max: _.max(data)
        })),
      }}
      height={380}
      width={400}
    />
  </Widget>
}

export default DayOfWeekRadar