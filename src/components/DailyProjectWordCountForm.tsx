import { use, useState, type SubmitEventHandler } from 'react';
import { addDays, isBefore } from 'date-fns';

import { insertWordCounts } from '@/api';
import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
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
  values?: WordCountEntry | null;
  onCompleted?: () => void;
}
const DailyProjectWordCountForm = ({
  className = '',
  values,
  onCompleted = () => { },
}: Props) => {
  const { fandoms } = use(DataCacheContext)

  const [showTextarea, setShowTextarea] = useState<boolean>(!values)

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries()) as DailyProjectWordCountFormValues;
    const entry: WordCountEntry = {
      date: formData.date,
      fandom: formData.fandom,
      fic: formData.fic,
      count: parseInt(formData.count || '0', 10) || 0
    }

    if (entry.count === 0) {
      const pastedWords = (formData.pastedWords || '').trim();
      entry.count = pastedWords === '' ? 0 : pastedWords.split(' ').length
    }

    insertWordCounts([entry]).then(() => onCompleted())
  }

  return <form
    onSubmit={handleSubmit}
    className={[className, 'flex flex-col gap-4 rounded-md p-3'].join(' ')}
  >
    <DateInput
      name="date"
      label="Date"
      // If after midnight but before 4am, log as day before
      defaultValue={values?.date || isBefore(new Date(), new Date().setHours(4)) ? addDays(new Date(), -1) : new Date()}
    />
    <Input<string>
      label="Fic"
      name="fic"
      type="text"
      defaultValue={values?.fic || ''}
    />
    <Dropdown
      label="Fandom"
      placeholder='Select a fandom'
      name="fandom"
      options={fandoms}
      defaultValue={values?.fandom || ''}
    />

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
    >
      Log word count</Button>
  </form>
}

export default DailyProjectWordCountForm