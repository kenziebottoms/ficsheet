import { use } from 'react';
import { PieChart } from '@mui/x-charts'
import _ from 'lodash'

import { MonthContext } from '@/contexts/Month/MonthContext';

import Widget from '@/components/Widget';

import { getDynamicColorPalette } from '../../constants';

const FandomPie = ({
  className = ''
}) => {
  const { filteredEntries } = use(MonthContext)

  const fandoms = _.uniq(_.map(filteredEntries, 'fandom')).sort()
  const data = fandoms.map((fandom, i) => ({
    id: i,
    label: fandom,
    value: _.sumBy(_.filter(filteredEntries, { fandom }), 'count'),
  }))

  return <Widget title="Word Count By Fandom" className={className}>
    <PieChart
      series={[{ data }]}
      width={400}
      height={400}
      colors={getDynamicColorPalette(fandoms.length)}
    />
  </Widget>
}

export default FandomPie