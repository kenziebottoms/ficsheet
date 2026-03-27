import { useState, type SubmitEventHandler } from 'react';
import Switch from '@mui/material/Switch';
import { addDays, isBefore } from 'date-fns';

import type { WordCountEntry } from '../types';

import Button from './Button';
import DateInput from './DateInput';
import Dropdown from './Dropdown';
import Input from './Input';
import TextArea from './TextArea';

export type DailyProjectWordCountFormValues = {
  date: string;
  fic: string;
  fandom: string;
  pastedWords?: string;
  count?: string;
}
type Props = {
  className?: string;
}
const DailyProjectWordCountForm = ({
  className = ''
}: Props) => {
  const [showTextarea, setShowTextarea] = useState<boolean>(true)

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

    // TODO: store data
    console.log('formData', formData);
    console.log('entry', entry);
  }

  return <form
    onSubmit={handleSubmit}
    className={[className, 'flex flex-col gap-4 rounded-md p-3'].join(' ')}
  >
    <DateInput
      name="date"
      label="Date"
      // If after midnight but before 4am, log as day before
      defaultValue={isBefore(new Date(), new Date().setHours(4)) ? addDays(new Date(), -1) : new Date()}
    />
    <Input
      label="Fic"
      name="fic"
      type="text"
    />
    <Dropdown
      label="Fandom"
      placeholder='Select a fandom'
      name="fandom"
      options={[
        "Inception",
        "Mad Max"
      ]}
    />

    <label className='flex flex-row gap-2'>
      Count my words
      <Switch
        color="secondary"
        value={showTextarea}
        onChange={e => setShowTextarea(e.target.checked)}
        defaultChecked
      />
    </label>

    {showTextarea ?
      <TextArea
        label="Words"
        name="pastedWords"
      /> :
      <Input label="Word count" type="number" name="count" />}

    <Button
      type="submit"
      style="primary"
    >
      Log word count</Button>
  </form>
}

export default DailyProjectWordCountForm