import { use, useState } from 'react'
import _ from 'lodash'
import { parse } from 'date-fns';

import { DataCacheContext } from '../../../contexts/DataCache/DataCacheContext';
import { MonthNames, type MonthName, type WordCountEntry } from '../../../types';
import { getMonthName } from '../../../utils';

import Button from '../../Button';
import { ButtonBackgroundClassNames } from '../../constants'

import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import DailyWordCountStats from "./DailyWordCountStats";
import RunningTotalLine from "./RunningTotalLine";
import type { MonthYearTimeframe } from './types';

const MonthYearTabs = () => {
  const { dailyEntries } = use(DataCacheContext)
  const [timeframe, setTimeframe] = useState<MonthYearTimeframe>(new Date().getFullYear())

  const monthlyEntries: Partial<Record<MonthName, WordCountEntry[]>> = _.groupBy(dailyEntries, ({ date }) => getMonthName(parse(date, 'yyyy-MM-dd', new Date())))
  const availableMonths = MonthNames.filter((monthName) => !!monthlyEntries[monthName])

  return <>
    <div className="flex flex-row gap-2">
      {[
        new Date().getFullYear(),
        ...availableMonths.map((_month, i) => i),
      ].map(t => <Button
        key={t}
        style={t === timeframe ? (t > 100 ? "primary" : "secondary") : "subtle"}
        className={["transition-all duration-100 capitalize", t === timeframe ? 'rounded-b-none mt-2' : 'mb-2'].join(" ")}
        onClick={() => setTimeframe(t)}
      >
        {t > 100 ? t : MonthNames[t].substring(0, 3)}
      </Button>)}
    </div>
    <div className={[ButtonBackgroundClassNames[timeframe > 100 ? 'primary' : 'secondary'], "-mt-3 rounded-tl-none rounded-md p-3 space-y-3"].join(' ')}>
      <DailyWordCountStats timeframe={timeframe} />

      <div className="flex flex-row flex-wrap gap-3">
        <FandomPie timeframe={timeframe} />
        <RunningTotalLine timeframe={timeframe} />
        <DayOfWeekRadar timeframe={timeframe} />
      </div>
    </div>
  </>
}

export default MonthYearTabs