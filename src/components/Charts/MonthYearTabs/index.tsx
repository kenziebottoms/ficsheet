import { useState } from 'react'
import { lastDayOfMonth } from 'date-fns';

import { BoundedTimeframe, PeriodButtonStyles } from '../../../classes/BoundedTimeframe';
import { MonthNames } from '../../../types';

import Button from '../../Button';
import { ButtonBackgroundClassNames } from '../../constants'

import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import DailyWordCountStats from "./DailyWordCountStats";
import RunningTotalLine from "./RunningTotalLine";

const MonthYearTabs = () => {
  const today = new Date();
  const thisYear = today.getFullYear();

  const timeframes: {
    timeframe: BoundedTimeframe,
    label: string
  }[] = [
      // YTD
      {
        label: `${thisYear}`,
        timeframe: new BoundedTimeframe({
          startDate: new Date(new Date().getFullYear(), 0, 1),
          endDate: new Date(),
          period: "yearly"
        })
      },
      // Monthly to current month
      ...MonthNames
        .slice(0, today.getMonth() + 1)
        .map((_month, monthIndex) => ({
          label: MonthNames[monthIndex].slice(0, 3),
          timeframe: new BoundedTimeframe({
            startDate: new Date(thisYear, monthIndex, 1),
            // if current month, cap at today
            endDate: monthIndex === new Date().getMonth() ? new Date() : lastDayOfMonth(new Date(thisYear, monthIndex, 1)),
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