import { useState } from "react";
import {format, isSameMonth} from 'date-fns'

import type { DailyWordCountEntry } from "../../types";

import Button from "../Button";

import FandomPie from "./FandomPie";

type Props = {
  className?: string;
  dailyEntries: DailyWordCountEntry[];
}
type Timeframe = 'year' | 'month';
const Timeframes: Timeframe[] = ['year', 'month']
const Charts = ({
  dailyEntries,
  className = ''
}: Props) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('year')
  const filteredData = dailyEntries.filter(({date}) => timeframe === 'year' || isSameMonth(new Date(), date))

  return <div className={["p-3 flex flex-col gap-3", className].join(" ")}>
    <div className="flex flex-row gap-2 justify-between">
      <h2 className="grow">Charts</h2>
      {Timeframes.map(t => <Button
        style={t === timeframe ? "secondary": "subtle"}
        className="capitalize"
        onClick={() => setTimeframe(t)}
      >
        {format(new Date(), t === 'year' ? 'yyyy' : 'MMMM')}
      </Button>)}
    </div>
    <div className="flex flex-row flex-wrap gap-3">
      <FandomPie dailyEntries={filteredData} />
    </div>
  </div>
}

export default Charts