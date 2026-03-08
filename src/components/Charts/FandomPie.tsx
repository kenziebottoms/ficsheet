import { use } from 'react';
import { PieChart } from '@mui/x-charts'
import _ from 'lodash'

import { DataCacheContext } from '../../contexts/DataCache/DataCacheContext';

import Widget from '../Widget';

import { colors } from './constants';
import { filterByTimeframe } from './utils';

const FandomPie = () => {
  const { dailyEntries, timeframe } = use(DataCacheContext)
  const fandoms = Object.keys(_.countBy(dailyEntries, 'fandom')).sort()
  const data = fandoms.map((fandom, i) => ({
    id: i,
    label: fandom,
    value: _.sumBy(_.filter(filterByTimeframe(dailyEntries, timeframe), { fandom }), 'count'),
  }))

  return <Widget title="Word Count By Fandom">
    <PieChart
      series={[{ data }]}
      width={200}
      height={200}
      colors={colors}
    />
  </Widget>
}

export default FandomPie