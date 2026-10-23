import { useState } from 'react';
import { Flag, PieChart, TableChart, TextSnippet, type SvgIconComponent } from '@mui/icons-material';

import Button from '@/components/Button';
import FicForm from '@/components/FicForm';
import Modal from '@/components/Modal';


import { MonthProvider } from '@/contexts/Month/MonthProvider';

import { type MonthlyChartTabName } from '../constants';

import Journal from './Journal';
import MonthlyCharts from './MonthlyCharts';
import Goals from './Goals';
import FicManager from './FicManager';

const TabIcons: Record<MonthlyChartTabName, SvgIconComponent> = {
  charts: PieChart,
  journal: TableChart,
  fics: TextSnippet,
  goals: Flag,
}

const YearlyCharts = () => {
  const [activeTab, setActiveTab] = useState<MonthlyChartTabName>('charts')
  const [showFicForm, setShowFicForm] = useState<boolean>(false)


  return <div className="bg-zinc-900 pt-2 space-y-3">
    <MonthProvider>
      <div className="bg-zinc-800 px-2 md:px-5 py-2 rounded-xl md:rounded-full text-zinc-400 grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:flex-wrap justify-around gap-2">
        {(['charts', 'fics', 'goals', 'journal'] as const).map(tab =>
          <Button
            key={tab}
            style={activeTab === tab ? "primary" : "subtle"}
            icon={TabIcons[tab]}
            onClick={() => setActiveTab(tab)}
            className='capitalize font-mono'
          >
            {tab}
          </Button>
        )}
      </div>

      {activeTab === 'charts' && <MonthlyCharts />}

      {activeTab === 'goals' && <Goals />}

      {activeTab === 'journal' && <Journal />}

      {activeTab === 'fics' && <FicManager />}
      <Modal
        open={showFicForm}
        setOpen={setShowFicForm}
      >
        <FicForm
          className='bg-zinc-800'
          onCompleted={() => setShowFicForm(false)}
        />
      </Modal>
    </MonthProvider>
  </div>
}

export default YearlyCharts