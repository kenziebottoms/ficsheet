import { use } from 'react';
import { LineChart, } from '@mui/x-charts'
import _ from 'lodash'
import { format, isValid, parse } from 'date-fns';

import { DataCacheContext } from '../../contexts/DataCache/DataCacheContext';

import ChartWidget from './ChartWidget';
import { colors } from './constants';
import { filterByTimeframe, } from './utils';

const RunningTotalLine = () => {
  const { timeframe, runningTotal } = use(DataCacheContext)

  const dataset = filterByTimeframe(runningTotal, timeframe).map(rt => ({
    ...rt,
    timestamp: parse(rt.date, 'yyyy-MM-dd', new Date()).getTime()
  }))

  return <ChartWidget title="Running Total">
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
  </ChartWidget>
}

export default RunningTotalLine