import { use } from "react";
import _ from "lodash";
import { parse } from 'date-fns'

import { DataCacheContext } from "../../contexts/DataCache/DataCacheContext";
import { MonthNames, type WordCountEntry, type MonthName } from "../../types";
import { getMonthName } from "../../utils";

import Button from "../Button";
import { ButtonClassNames } from "../constants";

import FandomPie from "./FandomPie";
import MonthlyFandomBar from "./MonthlyFandomBar";
import RunningTotalLine from "./RunningTotalLine";
import QuickStats from "./QuickStats";
import DayOfWeekRadar from "./DayOfWeekRadar";
import MonthlySparkline from "./MonthlySparkline";

type Props = {
  className?: string;
}
const Charts = ({
  className = ''
}: Props) => {
  const { timeframe, setTimeframe, dailyEntries } = use(DataCacheContext)

  const monthlyEntries: Partial<Record<MonthName, WordCountEntry[]>> = _.groupBy(dailyEntries, ({ date }) => getMonthName(parse(date, 'yyyy-MM-dd', new Date())))
  const availableMonths = MonthNames.filter((monthName) => !!monthlyEntries[monthName])

  return (
    <div className={["p-3 flex flex-col gap-3", className].join(" ")}>
      <h2>Charts</h2>

      <div className="flex flex-row gap-2">
        <MonthlySparkline />
      </div>

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

      <div className={[ButtonClassNames[timeframe > 100 ? 'primary' : 'secondary'], "-mt-3 rounded-tl-none rounded-md p-3 space-y-3"].join(' ')}>
        <QuickStats />

        <div className="flex flex-row flex-wrap gap-3">
          <FandomPie />
          <RunningTotalLine />
          <DayOfWeekRadar />
        </div>
      </div>

      <h3 className="w-full my-2">This Year</h3>
      <div className="flex flex-row flex-wrap gap-3">
        <MonthlyFandomBar />
      </div>
    </div >
  )
}

export default Charts