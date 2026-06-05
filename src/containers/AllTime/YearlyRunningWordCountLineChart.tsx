import { use, useState } from 'react';
import { LineChart, } from '@mui/x-charts'
import { format, isLeapYear, isPast, isValid, parse } from 'date-fns';

import { YearContext } from '@/contexts/Year/YearContext';

import Toggle from '@/components/Toggle';
import Widget from '@/components/Widget';

import type { RunningTotal } from '@/types';

import { getDatesBetween, largeNumberFormatter } from '@/utils';

import { addTimestamp } from '../Charts/YearlyCharts/utils';
import { blendColors, getDynamicColorPalette } from '../Charts/constants';

type RunningTotalMap = {
  timestamp: number;
  date: string;
  [year: number]: number;
};

const YearlyRunningWordCountLineChart = ({
  runningTotals
}: {
  runningTotals?: RunningTotal[][];
}) => {
  const thisYear = new Date().getFullYear();
  const { availableYears } = use(YearContext)
  const [yearToDate, setYearToDate] = useState<boolean>(true)

  if (runningTotals == null || runningTotals.length < 1) return null

  // hardcode 2020 so we get leap year dates
  const dates: RunningTotalMap[] = getDatesBetween(parse('2020-01-01', 'yyyy-MM-dd', new Date()), parse('2020-12-31', 'yyyy-MM-dd', new Date())).map(date => ({
    date,
  }))
    .map(addTimestamp)
    .filter(({ date }) => !yearToDate || isPast(parse(`${thisYear}-${date.substring(5)}`, 'yyyy-MM-dd', new Date())))

  dates.forEach(({ date }, dateIndex) => {
    availableYears.filter(y => y != null).forEach((year, yearIndex) => {
      let yesterdaysTotal = 0;
      const dailyTotal = runningTotals[yearIndex].find(({ date: d }) => d.substring(5) === date.substring(5))
      if (dateIndex > 0) {
        yesterdaysTotal = dates[dateIndex - 1][`${year}`] ?? 0;
      }
      if (date.substring(5) === '02-29' && !isLeapYear(year) && isPast(parse(`${thisYear}-02-28`, 'yyyy-MM-dd', new Date()))) {
        dates[dateIndex][`${year}`] = yesterdaysTotal
      } else if (year !== thisYear || isPast(parse(`${thisYear}-${date.substring(5)}`, 'yyyy-MM-dd', new Date()))) {
        dates[dateIndex][`${year}`] = dailyTotal?.running_total || yesterdaysTotal
      }
    })
  })

  return <Widget title="Yearly Running Totals" className='flex flex-col'>
    <Toggle
      label='YTD'
      value={yearToDate}
      onChange={setYearToDate}
      className="self-end -mt-8"
    />
    <LineChart
      dataset={dates}
      xAxis={[
        {
          scaleType: 'time',
          dataKey: 'timestamp',
          valueFormatter(value) {
            if (isValid(value)) {
              return format(new Date(value), 'MMM d')
            }
            return value
          }
        },
      ]}
      series={availableYears.slice().reverse().filter(y => y != null).map((year) => ({
        label: `${year}`,
        dataKey: `${year}`,
        showMark: false,
      }))}
      width={1200}
      height={800}
      colors={[...getDynamicColorPalette(availableYears.length - 2).slice(0, availableYears.length - 2).map((color) => blendColors('#27272a', color, .5)), '#fff']}
      yAxis={[{ valueFormatter: largeNumberFormatter }]}
    />
  </Widget>
}

export default YearlyRunningWordCountLineChart