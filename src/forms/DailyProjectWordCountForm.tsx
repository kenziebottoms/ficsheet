import type { SubmitEventHandler } from 'react';

import type { DailyWordCountEntry } from '../types';

import Button from '../components/Button';
import DateInput from '../components/DateInput';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import TextArea from '../components/TextArea';

export type DailyProjectWordCountFormValues = {
  date: string;
  fic: string;
  fandom: string;
  pastedWords: string;
}
const DailyProjectWordCountForm = () => {
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
      wordCount: pastedWords.trim() === '' ? 0 : pastedWords.trim().split(' ').length,
    } as DailyWordCountEntry);
  }

  return <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-zinc-900 rounded-md p-2'>
    <DateInput
      name="date"
      label="Date"
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