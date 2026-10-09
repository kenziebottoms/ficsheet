import { use, useState } from 'react';
import { LineChart, } from '@mui/x-charts'
import _ from 'lodash'
import { format, getDayOfYear, isFuture, isLeapYear, isValid, } from 'date-fns';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import Spinner from '@/components/Spinner';
import Toggle from '@/components/Toggle';
import Widget from '@/components/Widget';

import { largeNumberFormatter } from '@/utils';

import { colors } from '../../constants';

import { addTimestamp } from '../utils';

const RunningTotalLineWithProjection = ({
  className = '',
}) => {
  const { runningTotal } = use(DataCacheContext)
  const { year } = use(YearContext)

  const [showProjection, setShowProjection] = useState(true)

  if (year == null || runningTotal == null || runningTotal.length < 1) return null;

  const daysInYear = isLeapYear(year) ? 366 : 365
  const daysPast = getDayOfYear(new Date())
  const todaysTotal = runningTotal[daysPast - 1]
  const projectedAnnualWordCount = Math.round(todaysTotal.running_total * (daysInYear / daysPast))

  const points = [
    ...runningTotal.slice(0, daysPast - 1),
    todaysTotal,
    todaysTotal,
    {
      date: `${year}-12-31`,
      running_total: projectedAnnualWordCount
    }
  ].map(addTimestamp)

  return <Widget title="Running Total w/Projection" className={`${className} flex flex-col`}>
    <Toggle
      label='Show Projected Annual Word Count'
      value={showProjection}
      onChange={setShowProjection}
      className="self-end -mt-8"
    />
    {runningTotal.length > 0 ? <LineChart
      dataset={points}
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
          data: _.map(points.slice(0, -2), 'running_total'),
          showMark: false,
        },
        {
          data: [
            ..._.fill(Array(points.length - 2), null),
            todaysTotal.running_total,
            ..._.fill(Array(daysInYear - daysPast - 2), null),
            projectedAnnualWordCount
          ],
          showMark: true,
        }
      ]}
      width={650}
      height={380}
      colors={colors}
      yAxis={[{ valueFormatter: largeNumberFormatter }]}
      sx={{ '& .line-after path': { strokeDasharray: '10 5' } }}
    /> : <div className='w-200 h-95 flex flex-col items-center justify-center'>
      <Spinner style="subtle" />
    </div>}
  </Widget>
}

export default RunningTotalLineWithProjection