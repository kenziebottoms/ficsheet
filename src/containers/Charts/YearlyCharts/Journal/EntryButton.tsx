import { use } from 'react';
import { Edit, Refresh } from '@mui/icons-material';

import { processFandom } from '@/api';

import Button from '@/components/Button';
import Pill from '@/components/Pill';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import type { WithId, WordCountEntry } from '@/types';

const EntryButton = ({
  entry,
  onClick,
}: {
  entry: WithId<WordCountEntry>;
  onClick: (entry: WithId<WordCountEntry>) => void;
}) => {
  const { refreshData } = use(DataCacheContext)
  const { year } = use(YearContext)

  if (year == null) return null;

  return <div className="flex flex-row items-stretch">
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
      onClick={() => onClick(entry)}
      icon={Edit}
      className='rounded-l-none'
    >
      {entry.count}
    </Button>
  </div>
}

export default EntryButton