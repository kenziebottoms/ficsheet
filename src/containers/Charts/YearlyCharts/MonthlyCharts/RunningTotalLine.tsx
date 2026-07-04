import { use } from 'react';
import { LineChart, } from '@mui/x-charts'
import _ from 'lodash'
import { format, isValid } from 'date-fns';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { MonthContext } from '@/contexts/Month/MonthContext';
import { YearContext } from '@/contexts/Year/YearContext';

import Spinner from '@/components/Spinner';
import Widget from '@/components/Widget';

import { largeNumberFormatter } from '@/utils';

import { colors } from '../../constants';

import { addTimestamp, filterByYearAndMonth, } from '../utils';

const RunningTotalLine = () => {
  const { runningTotal } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  if (year == null) return null;

  const dataset = filterByYearAndMonth(runningTotal, year, month, true).map(addTimestamp)

  return <Widget title="Running Total">
    {dataset.length > 0 ? <LineChart
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
    /> : <div className='w-200 h-95 flex flex-col items-center justify-center'>
      <Spinner style="subtle" />
    </div>}
  </Widget>
}

export default RunningTotalLine