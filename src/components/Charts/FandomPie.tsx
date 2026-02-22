import { PieChart } from '@mui/x-charts'
import _ from 'lodash'

import dailyEntries from '../../assets/dailyEntries'

const FandomPie = () => {
  const colors = [
    '#4f46e5', '#fb923c', '#f6339a'
  ]
  const fandoms = Object.keys(_.countBy(dailyEntries, 'fandom')).sort()
  const data = fandoms.map((fandom, i) => ({
    id: i,
    label: fandom,
    value: _.sumBy(_.filter(dailyEntries, { fandom }), 'wordCount'),
    color: colors[i % 3]
  }))

  return <PieChart
    series={[{ data }]}
    width={200}
    height={200}
  />
}

export default FandomPie