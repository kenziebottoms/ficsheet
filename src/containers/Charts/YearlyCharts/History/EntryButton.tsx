import Button from '@/components/Button';
import DailyProjectWordCountForm from '@/components/DailyProjectWordCountForm';
import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';
import type { WordCountEntry } from '@/types'
import Modal from "@/components/Modal";
import { use, useState } from 'react';
import { Edit } from '@mui/icons-material';
import Pill from '@/components/Pill';

const EntryButton = ({
  entry
}: {
  entry: WordCountEntry;
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
        onCompleted={() => refreshData(year)}
      />
    </Modal>}
    <div className="flex flex-row gap-2 items-center">
      {entry.count}
      <Pill style="primary">{entry.fic}</Pill>
      <div className="grow" />
      <Button
        style="transparent"
        small
        onClick={() => setShowForm(true)}
        icon={Edit}
      />
    </div>
  </>
}

export default EntryButton