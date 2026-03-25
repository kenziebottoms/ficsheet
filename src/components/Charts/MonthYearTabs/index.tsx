import { use, useState } from 'react'
import { lastDayOfMonth } from 'date-fns';

import { BoundedTimeframe, PeriodButtonStyles } from '../../../classes/BoundedTimeframe';
import { YearContext } from '../../../contexts/Year/YearContext';
import { MonthNames } from '../../../types';

import Button from '../../Button';
import { ButtonBackgroundClassNames } from '../../constants'

import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import DailyWordCountStats from "./DailyWordCountStats";
import RunningTotalLine from "./RunningTotalLine";

const MonthYearTabs = () => {
  const { year } = use(YearContext)
  const thisYear = new Date().getFullYear()

  const timeframes: {
    timeframe: BoundedTimeframe,
    label: string
  }[] = [
      // Whole Year (or YTD if current year)
      {
        label: year === thisYear ? 'YTD' : `${year}`,
        timeframe: new BoundedTimeframe({
          startDate: new Date(year, 0, 1),
          endDate: new Date(),
          period: "yearly"
        })
      },
      // Monthly
      ...MonthNames
        // (to date if current year)
        .slice(0, year === thisYear ? (new Date().getMonth() + 1) : 12)
        .map((_month, monthIndex) => ({
          label: MonthNames[monthIndex].slice(0, 3),
          timeframe: new BoundedTimeframe({
            startDate: new Date(year, monthIndex, 1),
            // if current month, cap at today
            endDate: monthIndex === new Date().getMonth() ? new Date() : lastDayOfMonth(new Date(year, monthIndex, 1)),
            period: "monthly"
          })
        })),
    ]

  const [timeframe, setTimeframe] = useState<BoundedTimeframe>(timeframes[0].timeframe)

  return <>
    <div className="flex flex-row gap-2">
      {timeframes.map(({ timeframe: t, label }, i) => <Button
        key={i}
        style={PeriodButtonStyles[t.period]}
        className={["transition-all duration-100 capitalize", t.equals(timeframe) ? 'rounded-b-none mt-2' : 'mb-2'].join(" ")}
        onClick={() => setTimeframe(t)}
      >
        {label}
      </Button>)}
    </div>
    <div className={[ButtonBackgroundClassNames[PeriodButtonStyles[timeframe.period]], "-mt-3 rounded-tl-none rounded-lg p-3 space-y-3"].join(' ')}>
      <div className="flex flex-row flex-wrap gap-3">
        <DailyWordCountStats timeframe={timeframe} />
      </div>

      <div className="flex flex-row flex-wrap gap-3">
        <FandomPie timeframe={timeframe} />
        <RunningTotalLine timeframe={timeframe} />
        <DayOfWeekRadar timeframe={timeframe} />
      </div>
    </div>
  </>
}

export default MonthYearTabs