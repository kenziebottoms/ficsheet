import { use, useState } from 'react';
import { Flag, PieChart, TableChart, TextSnippet, type SvgIconComponent } from '@mui/icons-material';

import Button from '@/components/Button';
import FicForm from '@/components/FicForm';
import Modal from '@/components/Modal';

import Goals from '@/containers/Goals';

import { MonthProvider } from '@/contexts/Month/MonthProvider';
import { YearContext } from '@/contexts/Year/YearContext';

import { type MonthlyChartTabName } from '../constants';

import Journal from './Journal';
import MonthlyCharts from './MonthlyCharts';
import ProjectedAnnualWordCount from './ProjectedAnnualWordCount';
import FicManager from './FicManager';

const TabIcons: Record<MonthlyChartTabName, SvgIconComponent> = {
  charts: PieChart,
  journal: TableChart,
  fics: TextSnippet,
  goals: Flag,
}

const YearlyCharts = () => {
  const { year } = use(YearContext)
  const thisYear = new Date().getFullYear()

  const [activeTab, setActiveTab] = useState<MonthlyChartTabName>('charts')
  const [showFicForm, setShowFicForm] = useState<boolean>(false)


  return <div className="bg-zinc-900 p-3 rounded-xl space-y-3">
    {year === thisYear && <ProjectedAnnualWordCount />}

    <MonthProvider>
      <div className="bg-zinc-800 px-5 py-2 rounded-full text-zinc-400 flex flex-row flex-wrap justify-around gap-3">
        {(['charts', 'fics', 'goals', 'journal'] as const).map(tab =>
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