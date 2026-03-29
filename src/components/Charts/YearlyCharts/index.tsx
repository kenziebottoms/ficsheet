import { MonthProvider } from '@/contexts/Month/MonthProvider';

import MonthlyFandomBar from './MonthlyFandomBar';
import MonthlyCharts from './MonthlyCharts';

const YearlyCharts = () => {
  return <div className="bg-zinc-900 p-3 rounded-xl">
    <div className='flex flex-row gap-2 justify-between'>
      <MonthlyFandomBar />
    </div>

    <MonthProvider>
      <MonthlyCharts />
    </MonthProvider>
  </div>
}

export default YearlyCharts