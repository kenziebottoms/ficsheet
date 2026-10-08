import { use, useState } from 'react';
import { LineChart, } from '@mui/x-charts'
import _ from 'lodash'
import { format, getDayOfYear, isLeapYear, isValid } from 'date-fns';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { MonthContext } from '@/contexts/Month/MonthContext';
import { YearContext } from '@/contexts/Year/YearContext';

import Spinner from '@/components/Spinner';
import Toggle from '@/components/Toggle';
import Widget from '@/components/Widget';

import { largeNumberFormatter } from '@/utils';

import { colors } from '../../constants';

import { addTimestamp, filterByYearAndMonth, } from '../utils';

const RunningTotalLine = ({
  className = '',
}) => {
  const { runningTotal } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  const [showProjection, setShowProjection] = useState(false)

  if (year == null) return null;

  const entries = filterByYearAndMonth(runningTotal, year, month, true);

  if (showProjection) {
    const year = new Date().getFullYear()
    const daysInYear = isLeapYear(year) ? 366 : 365
    const daysPast = getDayOfYear(new Date())
    const projectedAnnualWordCount = Math.round(entries[entries.length - 1].running_total * (daysInYear / daysPast))
    entries.push({
      date: `${year}-12-31`,
      running_total: projectedAnnualWordCount
    })
  }

  return <Widget title="Running Total" className={`${className} flex flex-col`}>
    <Toggle
      label='Show Projected Annual Word Count'
      value={showProjection}
      onChange={setShowProjection}
      className="self-end -mt-8"
    />
    {entries.length > 0 ? <LineChart
      dataset={entries.map(addTimestamp)}
      xAxis={[
        {
          scaleType: 'time',
          dataKey: 'timestamp',
          valueFormatter(value) {
            if (isValid(value)) {
              return format(new Date(value), 'MMM d')
            }
            return value
          }
        },
      ]}
      series={[{
        data: _.map(entries, 'running_total'),
        showMark: false,
      }]}
      width={650}
      height={380}
      colors={colors}
      yAxis={[{ valueFormatter: largeNumberFormatter }]}
    /> : <div className='w-200 h-95 flex flex-col items-center justify-center'>
      <Spinner style="subtle" />
    </div>}
  </Widget>
}

export default RunningTotalLine