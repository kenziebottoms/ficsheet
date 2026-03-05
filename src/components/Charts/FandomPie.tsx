import { PieChart } from '@mui/x-charts'
import _ from 'lodash'

import type { DailyWordCountEntry } from '../../types'

import ChartWidget from './ChartWidget';

type Props = {
  dailyEntries: DailyWordCountEntry[];
}
const FandomPie = ({
  dailyEntries,
}: Props) => {
  const colors = [
    '#4f46e5', '#fb923c', '#f6339a'
  ]
  const fandoms = Object.keys(_.countBy(dailyEntries, 'fandom')).sort()
  const data = fandoms.map((fandom, i) => ({
    id: i,
    label: fandom,
    value: _.sumBy(_.filter(dailyEntries, { fandom }), 'count'),
    color: colors[i % 3]
  }))

  return <ChartWidget
    dailyEntries={dailyEntries}
    title="Word Count By Fandom"
  >
    <PieChart
      series={[{ data }]}
      width={200}
      height={200}
      slotProps={{
        legend: {
          sx: {
            color: '#d4d4d8',
          },
        },
      }}
    />
  </ChartWidget>
}

export default FandomPie