import { use, useState } from 'react';
import { Edit, Refresh } from '@mui/icons-material';

import { processFandom } from '@/api';

import Button from '@/components/Button';
import DailyProjectWordCountForm from '@/components/DailyProjectWordCountForm';
import Modal from "@/components/Modal";
import Pill from '@/components/Pill';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import type { WordCountEntry } from '@/types'


const EntryButton = ({
  entry
}: {
  entry: WordCountEntry & { id: number };
}) => {
  const { refreshData } = use(DataCacheContext)
  const { year } = use(YearContext)
  const [showForm, setShowForm] = useState<boolean>(false)

  if (year == null) return null;

  return <>
    {showForm && <Modal
      open={showForm}
      setOpen={setShowForm}
    >
      <DailyProjectWordCountForm
        className='bg-zinc-800'
        values={entry}
        onCompleted={() => {
          setShowForm(false);
          refreshData(year);
        }}
      />
    </Modal>}
    <div className="flex flex-row items-stretch">
      <Pill style="primary" className="rounded-r-none">
        {entry.fic}
      </Pill>
      {entry.ficId == null && <Button
        icon={Refresh}
        style="cautionary"
        className='rounded-none'
        onClick={() => processFandom(entry.id).then(() => refreshData(year))}
      />}
      <Button
        style="transparent"
        small
        onClick={() => setShowForm(true)}
        icon={Edit}
        className='rounded-l-none'
      >
        {entry.count}
      </Button>
    </div>
  </>
}

export default EntryButton