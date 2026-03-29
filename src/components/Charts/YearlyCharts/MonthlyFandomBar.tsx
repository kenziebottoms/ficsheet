import { use } from 'react';
import { BarChart } from '@mui/x-charts'
import _ from 'lodash'
import { format } from 'date-fns';

import { DataCacheContext } from '../../../contexts/DataCache/DataCacheContext';
import { YearContext } from '../../../contexts/Year/YearContext';

import Widget from '../../Widget';

import { colors } from '../constants';

import { filterByYearAndMonth } from './utils';

const MonthlyFandomBar = () => {
  const { dailyEntries } = use(DataCacheContext)
  const { year } = use(YearContext)
  const entries = filterByYearAndMonth(dailyEntries, year, null, true)
  const fandoms = Object.keys(_.countBy(entries, 'fandom')).sort()

  const entriesGroupedByMonth = _.groupBy(entries, ({ date }) => format(date, 'MMM'))

  const monthlyTotalByFandom = _.map(entriesGroupedByMonth, (monthlyEntries, month) => {
    const monthlyFandomEntries = _.groupBy(monthlyEntries, 'fandom')
    return {
      month,
      ..._.mapValues(monthlyFandomEntries, entries => _.sumBy(entries, 'count'))
    }
  });

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
      width={100 + monthlyTotalByFandom.length * 60}
      height={200}
    />
  </Widget>
}

export default MonthlyFandomBar