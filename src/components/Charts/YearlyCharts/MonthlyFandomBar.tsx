import { use } from 'react';
import { BarChart } from '@mui/x-charts'
import _ from 'lodash'
import { parse } from 'date-fns';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import Widget from '@/components/Widget';

import { MonthNames, type WordCountEntry } from '@/types';
import { largeNumberFormatter } from '@/utils';

import { getDynamicColorPalette } from '../constants';

import { filterByYearAndMonth } from './utils';

interface FandomTotal {
  [key: string]: number;
};
const MonthlyFandomBar = () => {
  const { dailyEntries } = use(DataCacheContext)
  const { year } = use(YearContext)
  const entries = filterByYearAndMonth(dailyEntries, year, null, true)
  const fandoms = _.uniq(_.map(entries, 'fandom'))

  const entriesByMonth: WordCountEntry[][] = MonthNames
    .map((_monthName, monthIndex) => entries.filter(({ date }) => parse(date, 'yyyy-MM-dd', new Date()).getMonth() === monthIndex))
    // filter out empty months for current year
    .filter(entries => year !== new Date().getFullYear() || entries.length > 0)

  const monthlyTotalByFandom: Record<string, number | string>[] = entriesByMonth
    .map((monthlyEntries) => {
      const fandomTotals: FandomTotal = _.mapValues(
        _.groupBy(monthlyEntries, 'fandom'),
        (entries) => _.sumBy(entries, 'count')
      )
      return fandomTotals;
    }).map((fandomTotals, monthIndex) => ({
      ...fandomTotals,
      month: MonthNames[monthIndex].slice(0, 3)
    }));

  return <Widget title="Monthly Word Count By Fandom">
    <BarChart
      dataset={monthlyTotalByFandom}
      xAxis={[{ dataKey: 'month' }]}
      series={fandoms.map((fandom) => ({
        dataKey: fandom,
        label: fandom,
        stack: 'total'
      }))}
      colors={getDynamicColorPalette(fandoms.length)}
      width={100 + monthlyTotalByFandom.length * 60}
      height={200}
      yAxis={[{ valueFormatter: largeNumberFormatter }]}
    />
  </Widget>
}

export default MonthlyFandomBar