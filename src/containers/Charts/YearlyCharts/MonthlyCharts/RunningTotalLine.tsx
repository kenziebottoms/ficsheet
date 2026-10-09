import { use, useEffect, useState } from 'react';
import { LineChart, } from '@mui/x-charts'
import _ from 'lodash'
import { format, getDayOfYear, isLeapYear, isValid, } from 'date-fns';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { MonthContext } from '@/contexts/Month/MonthContext';
import { YearContext } from '@/contexts/Year/YearContext';

import Spinner from '@/components/Spinner';
import Toggle from '@/components/Toggle';
import Widget from '@/components/Widget';

import { largeNumberFormatter } from '@/utils';

import { colors } from '../../constants';

import { addTimestamp, filterByYearAndMonth } from '../utils';

const RunningTotalLine = ({
  className = '',
}) => {
  const { runningTotal } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  const isThisYear = year === new Date().getFullYear()

  const [showProjection, setShowProjection] = useState(isThisYear && month == null)

  useEffect(() => {
    setShowProjection(isThisYear && month == null)
  }, [year, month])

  if (year == null || runningTotal == null || runningTotal.length < 1) return null;

  const filteredTotals = filterByYearAndMonth(runningTotal, year, month, true)

  if (filteredTotals.length === 0) return null;

  const daysInYear = isLeapYear(year) ? 366 : 365
  const daysPast = getDayOfYear(new Date())
  const todaysTotal = filteredTotals[filteredTotals.length - 1]
  const projectedAnnualWordCount = Math.round(todaysTotal.running_total * (daysInYear / daysPast))

  const points = filteredTotals.slice()

  if (showProjection) {
    points.push({
      date: `${year}-12-31`,
      running_total: projectedAnnualWordCount
    })
  }

  return <Widget title="Running Total" className={`${className} flex flex-col`}>
    {(isThisYear && month == null) && <Toggle
      label='Show Projected Annual Word Count'
      value={showProjection}
      onChange={setShowProjection}
      className="self-end -mt-8"
    />}

    {runningTotal.length > 0 ? <LineChart
      dataset={points.map(addTimestamp)}
      xAxis={[
        {
          scaleType: 'time',
          dataKey: 'timestamp',
          valueFormatter(date: Date) {
            let stringValue = '';
            if (isValid(date)) {
              stringValue = format(new Date(date), 'MMM d')
            }
            return stringValue;
          }
        }
      ]}
      series={[
        {
          data: _.map(showProjection ? points.slice(0, -1) : points, 'running_total'),
          showMark: false,
        },
        {
          data: showProjection ? [
            ..._.fill(Array(points.length - 2), null),
            todaysTotal.running_total,
            projectedAnnualWordCount
          ] : [],
          showMark: false,
        }
      ]}
      width={650}
      height={380}
      colors={[colors[0]]}
      yAxis={[{ valueFormatter: largeNumberFormatter }]}
      sx={showProjection ? { 'svg > g > g > g:last-child > path': { strokeDasharray: '10 10' } } : undefined}
    /> : <div className='w-200 h-95 flex flex-col items-center justify-center'>
      <Spinner style="subtle" />
    </div>}
  </Widget>
}

export default RunningTotalLine