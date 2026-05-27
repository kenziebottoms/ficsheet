import { use } from 'react';
import { LineChart, } from '@mui/x-charts'
import _ from 'lodash'
import { format, isValid } from 'date-fns';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import Widget from '@/components/Widget';

import { largeNumberFormatter } from '@/utils';

import { colors } from '../constants';

import { addTimestamp, filterByYearAndMonth, } from './utils';

const RunningTotalLine = () => {
  const { runningTotal } = use(DataCacheContext)
  const { year } = use(YearContext)

  if (year == null || runningTotal.length === 0) return null;

  const paddedRunningTotal = runningTotal.slice()
  if (!runningTotal[0].date.includes("01-01")) {
    paddedRunningTotal.unshift({ date: `${year}-01-01`, running_total: 0 })
  }
  const dataset = filterByYearAndMonth(paddedRunningTotal, year, null, true).map(addTimestamp)

  return <Widget title="Running Total">
    <LineChart
      dataset={dataset}
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
        data: _.map(dataset, 'running_total'),
        showMark: false,
      }]}
      width={year === new Date().getFullYear() ? Math.min(100 + (new Date().getMonth() + 1) * 60, 800) : 800}
      height={380}
      colors={colors}
      yAxis={[{ valueFormatter: largeNumberFormatter }]}
    />
  </Widget>
}

export default RunningTotalLine