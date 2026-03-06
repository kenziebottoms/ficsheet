import { useEffect, useState } from 'react';
import { LineChart, } from '@mui/x-charts'
import _ from 'lodash'
import { format, isValid, parse } from 'date-fns';

import { selectRunningTotal } from '../../api';
import type { RunningTotal } from '../../types';

import ChartWidget from './ChartWidget';
import { colors } from './constants';
import { filterByTimeframe, type Timeframe } from './utils';

type Props = {
  timeframe: Timeframe;
}
const RunningTotalLine = ({
  timeframe
}: Props) => {
  const [runningTotal, setRunningTotal] = useState<RunningTotal[]>([])

  useEffect(() => {
    selectRunningTotal().then(response => setRunningTotal(response.map(rt => ({
      ...rt,
      timestamp: parse(rt.date, 'yyyy-MM-dd', new Date()).getTime()
    }))))
  }, [])

  return <ChartWidget title="Running Total">
    <LineChart
      dataset={filterByTimeframe(runningTotal, timeframe)}
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
        data: _.map(filterByTimeframe(runningTotal, timeframe), 'running_total'),
        showMark: false,
      }]}
      width={400}
      height={200}
      colors={colors}
    />
  </ChartWidget>
}

export default RunningTotalLine