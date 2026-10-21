import { use, useState } from 'react'
import { Restore } from '@mui/icons-material';

import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';

const FicDropdown = ({
  label,
  name,
  defaultValue,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue?: number | null;
  className?: string;
}) => {
  const { fics, allFics } = use(DataCacheContext)
  const [showOldFics, setShowOldFics] = useState<boolean>(false)

  return <div className={`flex flex-row gap-2 ${className}`}>
    <Dropdown
      label={label}
      name={name}
      defaultValue={defaultValue}
      className='grow'
      options={(showOldFics ? allFics : fics).map(fic => ({ value: fic.id, label: `${fic.name} (${fic.fandom})` }))}
    />

    {!showOldFics && (
      <Button
        icon={Restore}
        onClick={() => setShowOldFics(true)}
        style="transparent"
        small
        className='self-end pt-1.5 pb-1.5'
        label="Show Older Fics"
      />
    )}
  </div>
}

export default FicDropdown