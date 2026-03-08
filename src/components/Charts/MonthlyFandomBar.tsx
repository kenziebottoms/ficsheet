import { use } from 'react';
import { BarChart } from '@mui/x-charts'
import _ from 'lodash'
import { format } from 'date-fns';

import { DataCacheContext } from '../../contexts/DataCache/DataCacheContext';

import Widget from '../Widget';

import { colors } from './constants';

const MonthlyFandomBar = () => {
  const { dailyEntries } = use(DataCacheContext)
  const fandoms = Object.keys(_.countBy(dailyEntries, 'fandom')).sort()

  const entriesGroupedByMonth = _.groupBy(dailyEntries, ({ date }) => format(date, 'MMM'))

  const monthlyTotalByFandom = _.map(entriesGroupedByMonth, (monthlyEntries, month) => {
    const monthlyFandomEntries = _.groupBy(monthlyEntries, 'fandom')
    return {
      month,
      ..._.mapValues(monthlyFandomEntries, entries => _.sumBy(entries, 'count'))
    }
  }).reverse();

  return <Widget title="Monthly Word Count By Fandom">
    <BarChart
      dataset={monthlyTotalByFandom}
      xAxis={[{ dataKey: 'month' }]}
      series={fandoms.map((fandom) => ({
        dataKey: fandom,
        label: fandom,
        stack: 'total'
      }))}
      colors={colors}
      width={500}
      height={200}
    />
  </Widget>
}

export default MonthlyFandomBar