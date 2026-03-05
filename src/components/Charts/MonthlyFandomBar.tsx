import { BarChart } from '@mui/x-charts'
import _ from 'lodash'

import type { DailyWordCountEntry } from '../../types'

import ChartWidget from './ChartWidget';
import { format } from 'date-fns';

type Props = {
  dailyEntries: DailyWordCountEntry[];
}
const MonthlyFandomBar = ({
  dailyEntries,
}: Props) => {
  const colors = [
    '#4f46e5', '#fb923c', '#f6339a'
  ]
  const fandoms = Object.keys(_.countBy(dailyEntries, 'fandom')).sort()

  const entriesGroupedByMonth = _.groupBy(dailyEntries, ({ date }) => format(date, 'MMM'))

  const monthlyTotalByFandom = _.map(entriesGroupedByMonth, (monthlyEntries, month) => {
    const monthlyFandomEntries = _.groupBy(monthlyEntries, 'fandom')
    return {
      month,
      ..._.mapValues(monthlyFandomEntries, entries => _.sumBy(entries, 'count'))
    }
  }).reverse();

  return <ChartWidget
    dailyEntries={dailyEntries}
    title="Monthly Word Count By Fandom"
  >
    <BarChart
      dataset={monthlyTotalByFandom}
      xAxis={[{dataKey: 'month'}]}
      series={fandoms.map((fandom, i) => ({
        dataKey: fandom,
        label: fandom,
        stack: 'total',
        color: colors[i % colors.length]
      }))}
      width={500}
      height={200}
    />
  </ChartWidget>
}

export default MonthlyFandomBar