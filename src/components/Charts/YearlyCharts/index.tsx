import { use } from 'react';

import { MonthProvider } from '@/contexts/Month/MonthProvider';
import { YearContext } from '@/contexts/Year/YearContext';

import MonthlyFandomBar from './MonthlyFandomBar';
import MonthlyCharts from './MonthlyCharts';
import ThisYear from './ThisYear';

const YearlyCharts = () => {
  const { year } = use(YearContext)
  const thisYear = new Date().getFullYear()

  return <div className="bg-zinc-900 p-3 rounded-xl space-y-3">
    {year === thisYear && <ThisYear />}

    <div className='flex flex-row gap-2 items-start justify-between'>
      <MonthlyFandomBar />
    </div>

    <MonthProvider>
      <MonthlyCharts />
    </MonthProvider>
  </div>
}

export default YearlyCharts