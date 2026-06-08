import { use, useEffect, useState } from 'react';
import { AutoDelete, ContentPaste, Delete, Equalizer, TableChart, type SvgIconComponent } from '@mui/icons-material';

import { deleteEntriesByYear, selectAllWordCounts } from '@/api';

import Button from '@/components/Button';
import Toggle from '@/components/Toggle';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { MonthProvider } from '@/contexts/Month/MonthProvider';
import { YearContext } from '@/contexts/Year/YearContext';

import { copyPrettyJson } from '@/utils';

import { MonthlyChartTabNames, type MonthlyChartTabName } from '../constants';

import FandomTimelineBarChart from './FandomTimelineBarChart';
import History from './History';
import MonthlyFandomBar from './MonthlyFandomBar';
import MonthlyCharts from './MonthlyCharts';
import ProjectedAnnualWordCount from './ProjectedAnnualWordCount';
import RunningTotalLine from './RunningTotalLine';

const TabIcons: Record<MonthlyChartTabName, SvgIconComponent> = {
  charts: Equalizer,
  history: TableChart,
}

const YearlyCharts = () => {
  const { year } = use(YearContext)
  const { refreshData } = use(DataCacheContext)
  const thisYear = new Date().getFullYear()

  const [activeTab, setActiveTab] = useState<MonthlyChartTabName>('charts')
  const [showEmpty, setShowEmpty] = useState<boolean>(false)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  // must click delete button twice within 5 seconds to delete
  useEffect(() => {
    if (confirmDelete) {
      setTimeout(() => {
        setConfirmDelete(false)
      }, 5000)
    }
  }, [confirmDelete])

  if (year == null) return null;

  const handleExport = () => {
    selectAllWordCounts(year).then(copyPrettyJson)
  }

  const handleDelete = () => {
    deleteEntriesByYear(year).then(() => refreshData(year))
  }

  return <div className="bg-zinc-900 p-3 rounded-xl space-y-3">
    {year === thisYear && <ProjectedAnnualWordCount />}

    <div className={`flex flex-row flex-wrap justify-around gap-2 items-center`}>
      <MonthlyFandomBar />
      <RunningTotalLine />
    </div>

    <FandomTimelineBarChart />

    <MonthProvider>
      <div className="bg-zinc-800 px-4 p-[0.35rem] rounded-full text-zinc-400 flex flex-row flex-wrap gap-3">
        {MonthlyChartTabNames.map(tab =>
          <Button
            key={tab}
            style={activeTab === tab ? "primary" : "subtle"}
            icon={TabIcons[tab]}
            onClick={() => setActiveTab(tab)}
            className='capitalize'
            small
          >
            {tab}
          </Button>
        )}
        {activeTab === 'history' && <>
          <div className='grow' />
          <Button
            style="cautionary"
            icon={confirmDelete ? AutoDelete : Delete}
            onClick={() => confirmDelete ? handleDelete() : setConfirmDelete(true)}
            small
          >
            {confirmDelete && <em>Please</em>} Delete {year}
          </Button>
          <Button
            style="transparent"
            icon={ContentPaste}
            onClick={handleExport}
            small
          >
            Export
          </Button>
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