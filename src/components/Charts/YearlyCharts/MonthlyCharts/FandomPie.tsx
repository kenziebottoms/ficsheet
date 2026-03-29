import { use } from 'react';
import { PieChart } from '@mui/x-charts'
import _ from 'lodash'

import { DataCacheContext } from 'contexts/DataCache/DataCacheContext';
import { MonthContext } from 'contexts/Month/MonthContext';
import { YearContext } from 'contexts/Year/YearContext';

import Widget from 'components/Widget';
import { colors } from 'components/Charts/constants';

import { filterByYearAndMonth } from '../utils';

const FandomPie = () => {
  const { dailyEntries } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)
  const entries = filterByYearAndMonth(dailyEntries, year, month, true)
  const fandoms = Object.keys(_.countBy(entries, 'fandom')).sort()
  const data = fandoms.map((fandom, i) => ({
    id: i,
    label: fandom,
    value: _.sumBy(_.filter(entries, { fandom }), 'count'),
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