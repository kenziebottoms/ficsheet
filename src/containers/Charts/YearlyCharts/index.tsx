import { use, useState } from 'react';
import { Equalizer, TableChart, type SvgIconComponent } from '@mui/icons-material';

import Button from '@/components/Button';
import Toggle from '@/components/Toggle';

import { MonthProvider } from '@/contexts/Month/MonthProvider';
import { YearContext } from '@/contexts/Year/YearContext';

import { MonthlyChartTabNames, type MonthlyChartTabName } from '../constants';

import History from './History';
import MonthlyFandomBar from './MonthlyFandomBar';
import MonthlyCharts from './MonthlyCharts';
import ThisYear from './ThisYear';

const TabIcons: Record<MonthlyChartTabName, SvgIconComponent> = {
  charts: Equalizer,
  history: TableChart,
}

const YearlyCharts = () => {
  const { year } = use(YearContext)
  const thisYear = new Date().getFullYear()

  const [activeTab, setActiveTab] = useState<MonthlyChartTabName>('charts')
  const [showEmpty, setShowEmpty] = useState<boolean>(false)

  return <div className="bg-zinc-900 p-3 rounded-xl space-y-3">
    {year === thisYear && <ThisYear />}

    <div className='flex flex-row gap-2 items-start justify-between'>
      <MonthlyFandomBar />
    </div>

    <MonthProvider>
      <div className="bg-zinc-800 px-4 p-2 rounded-full text-zinc-400 flex flex-row gap-4">
        {MonthlyChartTabNames.map(tab =>
          <Button
            key={tab}
            style={activeTab === tab ? "primary" : "subtle"}
            icon={TabIcons[tab]}
            onClick={() => setActiveTab(tab)}
            className='capitalize'
          >
            {tab}
          </Button>
        )}
        {activeTab === 'history' && <>
          <div className='grow' />
          <Toggle
            label="Show empty"
            value={showEmpty}
            onChange={setShowEmpty}
            className="text-sm"
          />
        </>}
      </div>
      {activeTab === 'charts' && <MonthlyCharts />}
      {activeTab === 'history' && <History showEmpty={showEmpty} />}
    </MonthProvider>
  </div>
}

export default YearlyCharts