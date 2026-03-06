import { useState } from "react";
import _ from "lodash";
import { parse } from 'date-fns'

import { MonthNames, type DailyWordCountEntry, type MonthName } from "../../types";
import { getMonthName } from "../../utils";

import Button from "../Button";

import FandomPie from "./FandomPie";
import MonthlyFandomBar from "./MonthlyFandomBar";
import RunningTotalLine from "./RunningTotalLine";
import { filterByTimeframe, type Timeframe } from "./utils";

type Props = {
  className?: string;
  dailyEntries: DailyWordCountEntry[];
}
const Charts = ({
  dailyEntries,
  className = ''
}: Props) => {
  const [timeframe, setTimeframe] = useState<Timeframe>(new Date().getFullYear())

  const filteredData = filterByTimeframe(dailyEntries, timeframe)
  const monthlyEntries: Partial<Record<MonthName, DailyWordCountEntry[]>> = _.groupBy(dailyEntries, ({ date }) => getMonthName(parse(date, 'yyyy-MM-dd', new Date())))
  const availableMonths = MonthNames.filter((monthName) => !!monthlyEntries[monthName])

  return (
    <div className={["p-3 flex flex-col gap-3", className].join(" ")}>
      <h2 className="grow">Charts</h2>
      <div className="flex flex-row gap-2">
        {[
          new Date().getFullYear(),
          ...availableMonths.map((_month, i) => i),
        ].map(t => <Button
          key={t}
          style={t === timeframe ? "secondary" : "subtle"}
          className="capitalize"
          onClick={() => setTimeframe(t)}
        >
          {t > 100 ? t : MonthNames[t].substring(0,3)}
        </Button>)}
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        <FandomPie dailyEntries={filteredData} />
        <RunningTotalLine timeframe={timeframe} />

        <h3 className="w-full my-2">Yearly Graphs</h3>
        <MonthlyFandomBar dailyEntries={dailyEntries} />
      </div>
    </div>
  )
}

export default Charts