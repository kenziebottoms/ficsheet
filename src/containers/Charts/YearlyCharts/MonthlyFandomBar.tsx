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
import Spinner from '@/components/Spinner';

const MonthlyFandomBar = () => {
  const { dailyEntries } = use(DataCacheContext)
  const { year } = use(YearContext)

  if (year == null) return null;

  const entries = filterByYearAndMonth(dailyEntries, year, null, true)
  const fandoms = _.uniq(_.map(entries, 'fandom'))

  const entriesByMonth: WordCountEntry[][] = MonthNames
    .map((_monthName, monthIndex) => entries.filter(({ date }) => parse(date, 'yyyy-MM-dd', new Date()).getMonth() === monthIndex))
    // filter out empty months for current year
    .filter(entries => year !== new Date().getFullYear() || entries.length > 0)

  const monthlyTotalByFandom: Record<string, number | string>[] = entriesByMonth
    .map((monthlyEntries) => {
      const fandomTotals: {
        [key: string]: number;
      } = _.mapValues(
        _.groupBy(monthlyEntries, 'fandom'),
        (entries) => _.sumBy(entries, 'count')
      )
      return fandomTotals;
    }).map((fandomTotals, monthIndex) => ({
      ...fandomTotals,
      month: MonthNames[monthIndex].slice(0, 3)
    }));

  return <Widget title="Monthly Word Count By Fandom">
    {entries.length > 0 ? <BarChart
      dataset={monthlyTotalByFandom}
      xAxis={[{ dataKey: 'month' }]}
      series={fandoms.map((fandom) => ({
        dataKey: fandom,
        label: fandom,
        stack: 'total'
      }))}
      colors={getDynamicColorPalette(fandoms.length)}
      width={year === new Date().getFullYear() ? Math.min(100 + (new Date().getMonth() + 1) * 60, 800) : 800}
      height={350}
      yAxis={[{ valueFormatter: largeNumberFormatter }]}
    /> : <div className='w-200 h-75 flex flex-col items-center justify-center'>
      <Spinner style="subtle" />
    </div>}
  </Widget>
}

export default MonthlyFandomBar