import { use } from 'react';
import { PieChart } from '@mui/x-charts'
import _ from 'lodash'

import { MonthContext } from '@/contexts/Month/MonthContext';

import Widget from '@/components/Widget';

import { getDynamicColorPalette } from '../../constants';

const ShipPie = () => {
  const { filteredEntries } = use(MonthContext)

  const ships = _.uniq(_.map(filteredEntries, 'ship')).sort()
  const data = ships.map((ship, i) => ({
    id: i,
    label: ship ?? 'N/A',
    value: _.sumBy(_.filter(filteredEntries, { ship }), 'count'),
  }))

  return <Widget title="Word Count By Ship">
    <PieChart
      series={[{ data }]}
      width={400}
      height={400}
      colors={getDynamicColorPalette(ships.length)}
    />
  </Widget>
}

export default ShipPie