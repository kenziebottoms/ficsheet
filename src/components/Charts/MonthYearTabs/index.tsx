import { use, useState } from 'react'

import { MonthContext } from '../../../contexts/Month/MonthContext';
import { YearContext } from '../../../contexts/Year/YearContext';
import { MonthNames } from '../../../types';

import Button from '../../Button';
import { ButtonBackgroundClassNames } from '../../constants'
import History from '../../History';

import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import DailyWordCountStats from "./DailyWordCountStats";
import MonthlyFandomBar from './MonthlyFandomBar';
import RunningTotalLine from "./RunningTotalLine";

const MonthYearTabs = () => {
  const { year, setYear, availableYears } = use(YearContext)
  const { month, setMonth } = use(MonthContext)
  const thisYear = new Date().getFullYear()

  const [showHistory, setShowHistory] = useState<boolean>(false)

  return <>
    <div className="flex flex-row gap-2">
      {availableYears.map(y => <Button
        key={y}
        style={year === y ? 'primary' : 'subtle'}
        className={["transition-all duration-100 capitalize", y === year ? 'rounded-b-none mt-2' : 'mb-2'].join(" ")}
        onClick={() => setYear(y)}
      >
        {y}
      </Button>)}
    </div>
    <div className={[
      ButtonBackgroundClassNames.primary,
      year === availableYears[0] ? 'rounded-tl-none' : '',
      "-mt-3 rounded-xl p-3 space-y-3"
    ].join(' ')}>
      <div className="bg-zinc-900 p-3 rounded-xl">
        <div className='flex flex-row gap-2 justify-between'>
          {!showHistory && <MonthlyFandomBar />}

          {!showHistory && <Button
            style={showHistory ? "primary" : 'secondary'}
            onClick={() => setShowHistory(!showHistory)}
            className='self-start'
          >
            Edit
          </Button>}
          {showHistory && <History className='grow' />}
        </div>

        <div className='flex flex-row gap-2 mt-3'>
          <Button
            style={month == null ? 'primary' : 'subtle'}
            onClick={() => setMonth(null)}
            className={['whitespace-nowrap transition-all', month == null ? 'rounded-b-none mt-2' : 'mb-2'].join(' ')}
          >
            {year === thisYear ? 'YTD' : "Overall"}
          </Button>
          {MonthNames
            // (to date if current year)
            .slice(0, year === thisYear ? (new Date().getMonth() + 1) : 12)
            .map((monthName, m) => <Button
              key={m}
              style={month === m ? 'secondary' : 'subtle'}
              className={[
                "transition-all duration-100 capitalize",
                m === month ? 'rounded-b-none mt-2' : 'mb-2'
              ].join(" ")}
              onClick={() => setMonth(m)}
              small
            >
              {monthName.slice(0, 3)}
            </Button>)}
        </div>
        <div className={[
          'rounded-md p-3 space-y-3',
          month == null ? 'rounded-tl-none' : '',
          ButtonBackgroundClassNames[month === null ? 'primary' : 'secondary']
        ].join(' ')}>
          <div className="flex flex-row flex-wrap gap-3">
            <DailyWordCountStats />
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            <FandomPie />
            <RunningTotalLine />
            <DayOfWeekRadar />
          </div>
        </div>
      </div>
    </div>
  </>
}

export default MonthYearTabs