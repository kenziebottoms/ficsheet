import { use, useEffect, useState, type SubmitEventHandler } from 'react';
import { parse } from 'date-fns';
import { DeleteForever, Flag, Restore } from '@mui/icons-material';
import _ from 'lodash';

import { deleteEntry, insertGoal, putGoal, selectFics } from '@/api';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import type {
  Fic,
  Goal,
  GoalColor,
  WithId,
} from '@/types';

import Button from './Button';
import DateInput from './DateInput';
import Dropdown from './Dropdown';
import Input from './Input';

type Props = {
  className?: string;
  values?: Partial<WithId<Goal>> | null;
  onCompleted?: (response: WithId<Goal> | null) => void;
}
const GoalForm = ({
  className = '',
  values,
  onCompleted: _onCompleted = () => { },
}: Props) => {
  const { year, refreshYears } = use(YearContext)
  const { fics, refreshData } = use(DataCacheContext)

  const [allFics, setAllFics] = useState<WithId<Fic>[]>([])
  const [showOldFics, setShowOldFics] = useState<boolean>(false)

  const onCompleted = (response: WithId<Goal> | null) => {
    if (response != null) {
      const yearOfLastEntry = parseInt(response.startDate.slice(0, 4), 10)
      if (yearOfLastEntry !== year) {
        refreshData(yearOfLastEntry)
        refreshYears()
      }
    }
    _onCompleted(response)
  }

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries()) as Record<string, string>;
    const payload: Goal & { id: number | null } = {
      id: parseInt(formData.id, 10) || null,
      startDate: formData.startDate,
      name: formData.name,
      endDate: formData.endDate || null,
      fandom: formData.fandom || null,
      ficId: parseInt(formData.ficId, 10) || null,
      ship: formData.ship || null,
      targetWordCount: parseInt(formData.targetWordCount, 10),
      color: formData.color as GoalColor
    }

    if (payload.id) {
      return putGoal(payload as WithId<Goal>).then(response => onCompleted(response))
    }
    return insertGoal(payload).then(response => onCompleted(response))
  }

  useEffect(() => {
    selectFics().then(af => setAllFics(_.orderBy(af, ({ name }) => name.toLowerCase())))
  }, [])

  return <form
    onSubmit={handleSubmit}
    className={[className, 'flex flex-col gap-4 rounded-md p-3'].join(' ')}
    tabIndex={-1}
  >
    <Input
      name="id"
      type="number"
      label="id"
      defaultValue={values?.id}
      hidden
    />

    <Input
      name="name"
      label="Name"
      type="text"
      defaultValue={values?.name}
    />

    <DateInput
      name="startDate"
      label="Start Date"
      defaultValue={values?.startDate ? parse(values?.startDate, 'yyyy-MM-dd', new Date()) : new Date()}
    />
    <DateInput
      name="endDate"
      label="End Date"
      defaultValue={values?.endDate ? parse(values?.endDate, 'yyyy-MM-dd', new Date()) : null}
    />

    <Input
      name="targetWordCount"
      label="Target Word Count"
      type="number"
      defaultValue={values?.targetWordCount}
    />

    <Input
      name="fandom"
      label="Fandom"
      type="text"
      defaultValue={values?.fandom}
    />

    <Input
      name="ship"
      label="Ship"
      type="text"
      defaultValue={values?.ship}
    />

    <Dropdown
      label="Color"
      name="color"
      defaultValue={values?.color}
      options={["pink", "orange", "lime", "emerald", "cyan", "indigo", "rainbow", "gray"]}
    />

    <div className='flex flex-row gap-2'>
      <Dropdown
        label="Fic"
        name="ficId"
        defaultValue={values?.ficId}
        options={(showOldFics ? allFics : fics).map(fic => ({ value: fic.id, label: `${fic.name} (${fic.fandom})` }))}
      />
      {!showOldFics && (
        <Button
          icon={Restore}
          onClick={() => setShowOldFics(true)}
          style="transparent"
          small
          className='self-end'
          aria-label="Show Older Fics"
        />
      )}
    </div>

    <Button
      type="submit"
      style="primary"
      icon={Flag}
    >
      {values?.id == null ? 'Add' : 'Update'} goal
    </Button>
    {values?.id != null && (
      <Button
        style="cautionary"
        icon={DeleteForever}
        onClick={() => deleteEntry(values.id as number).then(() => onCompleted(null))}
        className='mt-4'
      >
        Delete goal
      </Button>
    )}
  </form>
}

export default GoalForm