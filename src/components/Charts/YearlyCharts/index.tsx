import { useState } from 'react'

import { MonthProvider } from '../../../contexts/Month/MonthProvider';

import Button from '../../Button';
import History from '../../History';

import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import DailyWordCountStats from "./DailyWordCountStats";
import MonthlyFandomBar from './MonthlyFandomBar';
import RunningTotalLine from "./RunningTotalLine";

const YearlyCharts = () => {
  const [showHistory, setShowHistory] = useState<boolean>(false)

  return <>
    <div className="bg-zinc-900 p-3 rounded-xl">
      <div className='flex flex-row gap-2 justify-between'>
        <MonthlyFandomBar />
      </div>

      <MonthProvider>
        {showHistory && <Button
          style="primary"
          onClick={() => setShowHistory(!showHistory)}
          className='self-end'
        >
          Edit
        </Button>}
        {showHistory ? <History /> : <>
          <div className="flex flex-row flex-wrap justify-between gap-3">
            <DailyWordCountStats />
            <Button
              style='secondary'
              onClick={() => setShowHistory(!showHistory)}
              className='self-start'
            >
              Edit
            </Button>
          </div>
          <div className="flex flex-row flex-wrap gap-3">
            <FandomPie />
            <RunningTotalLine />
            <DayOfWeekRadar />
          </div>
        </>}
      </MonthProvider>
    </div>
  </>
}

export default YearlyCharts