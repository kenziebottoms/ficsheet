import type { SubmitEventHandler } from 'react';

import type { WordCountEntry } from '../types';

import Button from './Button';
import DateInput from './DateInput';
import Dropdown from './Dropdown';
import Input from './Input';
import TextArea from './TextArea';
import { addDays, isBefore } from 'date-fns';

export type DailyProjectWordCountFormValues = {
  date: string;
  fic: string;
  fandom: string;
  pastedWords: string;
}
type Props = {
  className?: string;
}
const DailyProjectWordCountForm = ({
  className = ''
}: Props) => {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const {
      pastedWords,
      ...formData
    } = Object.fromEntries(new FormData(e.target).entries()) as DailyProjectWordCountFormValues;

    // TODO: store data
    console.log({
      ...formData,
      count: pastedWords.trim() === '' ? 0 : pastedWords.trim().split(' ').length,
    } as WordCountEntry);
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
    <TextArea
      label="Words"
      name="pastedWords"
    />
    <Button
      type="submit"
      style="primary"
    >
      Log word count</Button>
  </form>
}

export default DailyProjectWordCountForm