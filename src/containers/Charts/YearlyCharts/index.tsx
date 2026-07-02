import { use, useEffect, useState } from 'react';
import { AppRegistration, AutoDelete, AutoMode, AutoStories, ContentPaste, Delete, Equalizer, NoteAdd, TableChart, type SvgIconComponent } from '@mui/icons-material';

import { deleteEntriesByYear, exportData, processFandomsForYear } from '@/api';

import Button from '@/components/Button';
import FicForm from '@/components/FicForm';
import Toggle from '@/components/Toggle';
import Modal from '@/components/Modal';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { MonthProvider } from '@/contexts/Month/MonthProvider';
import { YearContext } from '@/contexts/Year/YearContext';

import { copyPrettyJson } from '@/utils';

import { type MonthlyChartTabName } from '../constants';

import FandomTimelineBarChart from './FandomTimelineBarChart';
import Journal from './Journal';
import MonthlyFandomBar from './MonthlyFandomBar';
import MonthlyCharts from './MonthlyCharts';
import ProjectedAnnualWordCount from './ProjectedAnnualWordCount';
import RunningTotalLine from './RunningTotalLine';
import FicTimelineBarChart from './FicTimelineBarChart';
import FicManager from './FicManager';

const TabIcons: Record<MonthlyChartTabName, SvgIconComponent> = {
  charts: Equalizer,
  journal: TableChart,
  fics: AutoStories,
}

const YearlyCharts = () => {
  const { year } = use(YearContext)
  const { refreshData } = use(DataCacheContext)
  const thisYear = new Date().getFullYear()

  const [activeTab, setActiveTab] = useState<MonthlyChartTabName>('charts')
  const [showEmpty, setShowEmpty] = useState<boolean>(false)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const [showFicForm, setShowFicForm] = useState<boolean>(false)

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
    exportData(year).then(copyPrettyJson)
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
    <FicTimelineBarChart />

    <MonthProvider>
      <div className="bg-zinc-800 px-5 py-2 rounded-full text-zinc-400 flex flex-row flex-wrap gap-3">
        {(['charts', 'fics'] as const).map(tab =>
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

        <div className='grow' />

        {activeTab === 'fics' && <>
          <Button
            icon={NoteAdd}
            onClick={() => setShowFicForm(true)}
            small
            style="transparent"
          >
            New Fic
          </Button>
        </>}

        <Button
          style={activeTab === 'journal' ? 'active_transparent' : "transparent"}
          icon={AppRegistration}
          onClick={() => setActiveTab('journal')}
          small
        >
          Journal
        </Button>
      </div>

      {activeTab === 'charts' && <MonthlyCharts />}

      {activeTab === 'journal' && <div className='space-y-2'>
        <div className='bg-zinc-900 p-2 rounded-md flex flex-row justify-end gap-4'>
          <Button
            style="cautionary"
            icon={confirmDelete ? AutoDelete : Delete}
            onClick={() => confirmDelete ? handleDelete() : setConfirmDelete(true)}
            small
          >
            {confirmDelete && <em>Please</em>} Delete {year}
          </Button>

          <Button
            style="cautionary"
            icon={AutoMode}
            onClick={() => processFandomsForYear(year).then(() => refreshData(year))}
            small
          >
            Migrate Fandoms
          </Button>

          <div className='grow' />

          <Button
            style="transparent"
            icon={ContentPaste}
            onClick={handleExport}
            small
          >
            Export to Clipboard
          </Button>

          <Toggle
            label="Show empty"
            value={showEmpty}
            onChange={setShowEmpty}
            className="text-sm"
          />
        </div>

        <Journal showEmpty={showEmpty} />
      </div>}

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