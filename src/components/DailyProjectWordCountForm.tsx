import { use, useState, type SubmitEventHandler } from 'react';
import { addDays, isBefore, parse } from 'date-fns';
import { Add, DeleteForever, EditCalendar } from '@mui/icons-material';

import { deleteEntry, insertEntries, putEntry } from '@/api';
import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { countWords } from '@/utils';
import type { WordCountEntry } from '@/types';

import Button from './Button';
import DateInput from './DateInput';
import Dropdown from './Dropdown';
import Input from './Input';
import TextArea from './TextArea';
import Toggle from './Toggle';

export type DailyProjectWordCountFormValues = {
  date: string;
  fic: string;
  fandom: string;
  pastedWords?: string;
  count?: string;
}
type Props = {
  className?: string;
  values?: Partial<WordCountEntry> | null;
  onCompleted?: () => void;
}
const DailyProjectWordCountForm = ({
  className = '',
  values,
  onCompleted = () => { },
}: Props) => {
  const { fandoms } = use(DataCacheContext)

  const [typeNewFandom, setTypeNewFandom] = useState<boolean>(false)
  const [showTextarea, setShowTextarea] = useState<boolean>(!values)

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries()) as DailyProjectWordCountFormValues;
    const entry: WordCountEntry = {
      id: values?.id,
      date: formData.date,
      fandom: formData.fandom,
      fic: formData.fic,
      count: parseInt(formData.count || '0', 10) || 0
    }

    if (entry.count === 0) {
      entry.count = countWords(formData.pastedWords)
    }

    if (entry.count !== 0) {
      if (values?.id != null) {
        putEntry(entry).then(onCompleted)
      } else {
        insertEntries([entry]).then(onCompleted)
      }
    } else if (entry.id != null) {
      deleteEntry(entry.id).then(onCompleted)
    }
  }

  // default to today (unless it's after midnight but before 4AM, then default to "yesterday")
  const defaultDate = isBefore(new Date(), new Date().setHours(4)) ? addDays(new Date(), -1) : new Date()

  return <form
    onSubmit={handleSubmit}
    className={[className, 'flex flex-col gap-4 rounded-md p-3'].join(' ')}
  >
    <DateInput
      name="date"
      label="Date"
      defaultValue={values?.date ? parse(values?.date, 'yyyy-MM-dd', new Date()) : addDays(defaultDate, -1)}
    />
    <Input<string>
      label="Fic"
      name="fic"
      type="text"
      defaultValue={values?.fic || ''}
    />

    <div className='flex flex-row gap-2'>
      {typeNewFandom ? <Input<string>
        label="Fandom"
        name="fandom"
        type="text"
        defaultValue={values?.fandom || ''}
      /> : <>
        <Dropdown
          label="Fandom"
          placeholder='Select a fandom'
          name="fandom"
          options={fandoms}
          defaultValue={values?.fandom || ''}
        />
        <Button
          style="transparent"
          icon={Add}
          className='self-end'
          onClick={() => setTypeNewFandom(true)}
        />
      </>}
    </div>

    <Toggle
      className='flex flex-row gap-2'
      label="Count my words"
      color="secondary"
      value={showTextarea}
      onChange={setShowTextarea}
    />

    {showTextarea ?
      <TextArea
        label="Words"
        name="pastedWords"
      /> :
      <Input
        label="Word count"
        type="number"
        name="count"
        defaultValue={values?.count || ''}
      />}

    <Button
      type="submit"
      style="primary"
      icon={EditCalendar}
    >
      {values?.id == null ? 'Log' : 'Update'} word count
    </Button>
    {!!values && values.id != null && (
      <Button
        style="cautionary"
        icon={DeleteForever}
        onClick={() => deleteEntry(values.id as number).then(onCompleted)}
        className='mt-4'
      >
        Delete word count
      </Button>
    )}
  </form>
}

export default DailyProjectWordCountForm