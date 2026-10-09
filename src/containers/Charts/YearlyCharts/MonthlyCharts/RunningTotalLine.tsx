import { use, useState } from 'react';
import { LineChart, } from '@mui/x-charts'
import _ from 'lodash'
import { format, getDayOfYear, isFuture, isLeapYear, isValid, } from 'date-fns';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import Spinner from '@/components/Spinner';
import Toggle from '@/components/Toggle';
import Widget from '@/components/Widget';

import type { RunningTotal } from '@/types';

import { largeNumberFormatter } from '@/utils';

import { colors } from '../../constants';

import { addTimestamp } from '../utils';

const RunningTotalLine = ({
  className = '',
}) => {
  const { runningTotal } = use(DataCacheContext)
  const { year } = use(YearContext)

  const [showProjection, setShowProjection] = useState(year === new Date().getFullYear())

  if (year == null || runningTotal == null || runningTotal.length < 1) return null;

  const daysInYear = isLeapYear(year) ? 366 : 365
  const daysPast = getDayOfYear(new Date())
  const todaysTotal = runningTotal[daysPast - 1]
  const projectedAnnualWordCount = Math.round(todaysTotal.running_total * (daysInYear / daysPast))

  let points: RunningTotal[] = []
  if (year === new Date().getFullYear()) {
    points = runningTotal.slice(0, daysPast)
    if (showProjection) {
      points.push({
        date: `${year}-12-31`,
        running_total: projectedAnnualWordCount
      })
    }
  }

  return <Widget title="Running Total" className={`${className} flex flex-col`}>
    {year === new Date().getFullYear() && <Toggle
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
            if (isFuture(date)) {
              stringValue += ' (est.)';
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