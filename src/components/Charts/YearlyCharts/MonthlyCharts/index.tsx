import { useState } from "react";

import Button from "components/Button";
import History from "components/History";

import DailyWordCountStats from "./DailyWordCountStats";
import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import RunningTotalLine from "./RunningTotalLine";

const MonthlyCharts = () => {
  const [showHistory, setShowHistory] = useState<boolean>(false)

  return <>
    {showHistory && <Button
      style="primary"
      onClick={() => setShowHistory(!showHistory)}
      className='self-end'
    >
      Edit
    </Button>}
    {showHistory ? <History /> : <MonthlyCharts />}
    <div className="flex flex-row flex-wrap justify-between gap-3">
      <DailyWordCountStats />
      <Button
        style='secondary'
        onClick={() => setShowHistory(!showHistory)}
        className='self-start'
      >
        Edit
      </Button>
      <MonthlyCharts />
    </div>
    <div className="flex flex-row flex-wrap gap-3">
      <FandomPie />
      <RunningTotalLine />
      <DayOfWeekRadar />
    </div>
  </>
}

export default MonthlyCharts