import { PieChart } from '@mui/x-charts'
import _ from 'lodash'

import type { DailyWordCountEntry } from '../../types'

import ChartWidget from './ChartWidget';
import { colors } from './constants';

type Props = {
  dailyEntries: DailyWordCountEntry[];
}
const FandomPie = ({
  dailyEntries,
}: Props) => {
  const fandoms = Object.keys(_.countBy(dailyEntries, 'fandom')).sort()
  const data = fandoms.map((fandom, i) => ({
    id: i,
    label: fandom,
    value: _.sumBy(_.filter(dailyEntries, { fandom }), 'count'),
  }))

  return <ChartWidget title="Word Count By Fandom">
    <PieChart
      series={[{ data }]}
      width={200}
      height={200}
      colors={colors}
    />
  </ChartWidget>
}

export default FandomPie