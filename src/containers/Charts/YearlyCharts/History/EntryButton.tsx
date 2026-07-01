import { use, useState } from 'react';
import { Edit } from '@mui/icons-material';

import Button from '@/components/Button';
import DailyProjectWordCountForm from '@/components/DailyProjectWordCountForm';
import Modal from "@/components/Modal";
import Pill from '@/components/Pill';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import type { WithId, WordCountEntry } from '@/types';

const EntryButton = ({
  entry
}: {
  entry: WithId<WordCountEntry>;
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