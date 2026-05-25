import { LineChart } from '@mui/x-charts'
import _ from 'lodash'
import { format, isValid } from 'date-fns';

import Widget from '@/components/Widget'

import type { RunningTotal } from '@/types'

import { largeNumberFormatter } from '@/utils';

import { colors } from '../Charts/constants';
import { addTimestamp } from '../Charts/YearlyCharts/utils';

const LifetimeWordCountLineChart = ({
  lifetimeRunningTotal
}: {
  lifetimeRunningTotal?: RunningTotal[];
}) => {
  if (lifetimeRunningTotal == null || lifetimeRunningTotal.length === 0) return null;

  return <Widget title={`Running Total Since ${lifetimeRunningTotal[0].date.slice(0, 4)}`}>
    <LineChart
      dataset={lifetimeRunningTotal.map(addTimestamp)}
      xAxis={[
        {
          scaleType: 'time',
          dataKey: 'timestamp',
          valueFormatter(value) {
            if (isValid(value)) {
              return format(new Date(value), "MMM ''yy")
            }
            return value
          }
        },
      ]}
      series={[{
        data: _.map(lifetimeRunningTotal, 'running_total'),
        showMark: false,
      }]}
      width={800}
      height={400}
      colors={colors}
      yAxis={[{ valueFormatter: largeNumberFormatter }]}
    />
  </Widget>
}

export default LifetimeWordCountLineChart