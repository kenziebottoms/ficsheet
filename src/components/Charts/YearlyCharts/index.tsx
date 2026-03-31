import { use, useState } from 'react';

import Button from '@/components/Button';
import DailyProjectWordCountForm from '@/components/DailyProjectWordCountForm';
import Modal from '@/components/Modal';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { MonthProvider } from '@/contexts/Month/MonthProvider';
import { YearContext } from '@/contexts/Year/YearContext';

import MonthlyFandomBar from './MonthlyFandomBar';
import MonthlyCharts from './MonthlyCharts';

const YearlyCharts = () => {
  const { refreshData } = use(DataCacheContext)
  const { year } = use(YearContext)

  const [showEntryForm, setShowEntryForm] = useState<boolean>(false)

  return <div className="bg-zinc-900 p-3 rounded-xl">
    <div className='flex flex-row gap-2 items-start justify-between'>
      <MonthlyFandomBar />
      {showEntryForm && <Modal open setOpen={setShowEntryForm}>
        <DailyProjectWordCountForm
          className='bg-zinc-800'
          onCompleted={() => {
            setShowEntryForm(false)
            refreshData(year)
          }}
        />
      </Modal>}
      {year === new Date().getFullYear() && (
        <Button
          onClick={() => setShowEntryForm(!showEntryForm)}
          style='primary'
        >
          Log
        </Button>
      )}
    </div>

    <MonthProvider>
      <MonthlyCharts />
    </MonthProvider>
  </div>
}

export default YearlyCharts