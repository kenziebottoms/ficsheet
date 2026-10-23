import { use, useEffect, useState, type SubmitEventHandler } from 'react';
import { parse } from 'date-fns';
import { DeleteForever, Flag } from '@mui/icons-material';

import { deleteGoal, insertGoal, putGoal, } from '@/api';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import type {
  Goal,
  GoalColor,
  GoalType,
  WithId,
} from '@/types';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import DateInput from './DateInput';
import Dropdown from './Dropdown';
import FicDropdown from './FicDropdown';
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
  const { refreshData } = use(DataCacheContext)

  const [goalType, setGoalType] = useState<GoalType>('overall')

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
    const payload: Omit<Goal, 'totalWordsWritten'> & { id: number | null } = {
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
    if (values?.fandom != null) {
      setGoalType('fandom')
    } else if (values?.fic != null) {
      setGoalType('fic')
    } else if (values?.ship != null) {
      setGoalType('ship')
    } else {
      setGoalType('overall')
    }
  }, [values?.fandom, values?.fic, values?.ship])

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

    <div className='flex flex-row flex-wrap gap-2'>
      <Input
        name="name"
        label="Name"
        type="text"
        className='grow'
        defaultValue={values?.name}
      />
      <Dropdown
        label="Color"
        name="color"
        defaultValue={values?.color || 'pink'}
        className='grow'
        options={["pink", "orange", "lime", "emerald", "cyan", "indigo", "rainbow", "gray"]}
      />
    </div>

    <div className='flex flex-row flex-wrap gap-2'>
      <DateInput
        name="startDate"
        label="Start Date"
        className="grow"
        defaultValue={values?.startDate ? parse(values?.startDate, 'yyyy-MM-dd', new Date()) : new Date()}
      />
      <DateInput
        name="endDate"
        label="End Date"
        className="grow"
        defaultValue={values?.endDate ? parse(values?.endDate, 'yyyy-MM-dd', new Date()) : null}
      />
    </div>

    <Input
      name="targetWordCount"
      label="Target Word Count"
      type="number"
      defaultValue={values?.targetWordCount}
    />

    <ButtonGroup
      label="Goal Type"
      options={['overall', 'fandom', 'fic', 'ship']}
      value={goalType}
      onChange={setGoalType}
      smallButtons
    />

    {goalType === 'fandom' && <Input
      name="fandom"
      label="Fandom"
      type="text"
      defaultValue={values?.fandom}
    />}

    {goalType === 'fic' && <FicDropdown
      label="Fic"
      name="ficId"
      defaultValue={values?.ficId}
    />}

    {goalType === 'ship' && <Input
      name="ship"
      label="Ship"
      type="text"
      defaultValue={values?.ship}
    />}

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
        onClick={() => deleteGoal(values.id as number).then(() => onCompleted(null))}
        className='mt-4'
      >
        Delete goal
      </Button>
    )}
  </form>
}

export default GoalForm