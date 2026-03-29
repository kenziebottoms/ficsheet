import { use } from 'react';
import { LineChart, } from '@mui/x-charts'
import _ from 'lodash'
import { format, isValid } from 'date-fns';

import { DataCacheContext } from 'contexts/DataCache/DataCacheContext';
import { MonthContext } from 'contexts/Month/MonthContext';
import { YearContext } from 'contexts/Year/YearContext';

import Widget from 'components/Widget';

import { colors } from '../../constants';

import { addTimestamp, filterByYearAndMonth, } from '../utils';

const RunningTotalLine = () => {
  const { runningTotal } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)
  const dataset = filterByYearAndMonth(runningTotal, year, month, true).map(addTimestamp)

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
      width={400}
      height={200}
      colors={colors}
    />
  </Widget>
}

export default RunningTotalLine