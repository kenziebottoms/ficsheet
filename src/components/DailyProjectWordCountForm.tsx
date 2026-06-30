import { use, useState, type SubmitEventHandler } from 'react';
import { addDays, isBefore, parse } from 'date-fns';
import { DeleteForever, EditCalendar } from '@mui/icons-material';

import { deleteEntry, insertEntries, putEntry } from '@/api';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import { countWords } from '@/utils';
import type { WithId, WordCountEntry } from '@/types';

import Button from './Button';
import DateInput from './DateInput';
import Dropdown from './Dropdown';
import Input from './Input';
import TextArea from './TextArea';
import Toggle from './Toggle';

export type DailyProjectWordCountFormValues = {
  date: string;
  fic: string;
  ficId: number | '';
  fandom: string;
  pastedWords?: string;
  count?: string;
}
type Props = {
  className?: string;
  values?: Partial<WordCountEntry> | null;
  onCompleted?: (response: WordCountEntry[] | null) => void;
}
const DailyProjectWordCountForm = ({
  className = '',
  values,
  onCompleted: _onCompleted = () => { },
}: Props) => {
  const { year, refreshYears } = use(YearContext)
  const { fics, refreshData } = use(DataCacheContext)

  const [showTextarea, setShowTextarea] = useState<boolean>(!values)

  const onCompleted = (response: WordCountEntry[]) => {
    if (response.length > 0) {
      const yearOfLastEntry = parseInt(response[0]?.date.slice(0, 4), 10)
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

    const formData = Object.fromEntries(new FormData(e.target).entries()) as DailyProjectWordCountFormValues;
    const entry: WordCountEntry = {
      id: values?.id,
      date: formData.date,
      fandom: formData.fandom,
      fic: formData.fic,
      ficId: formData.ficId === '' ? null : formData.ficId,
      count: parseInt(formData.count || '0', 10) || 0
    }

    if (entry.count === 0) {
      entry.count = countWords(formData.pastedWords)
    }

    if (entry.count !== 0) {
      if (values?.id != null) {
        putEntry(entry as WithId<WordCountEntry>).then(response => onCompleted([response]))
      } else {
        insertEntries([entry]).then(onCompleted)
      }
    } else if (entry.id != null) {
      deleteEntry(entry.id).then(() => onCompleted([]))
    }
  }

  // default to today (unless it's after midnight but before 4AM, then default to "yesterday")
  const defaultDate = isBefore(new Date(), new Date().setHours(4)) ? addDays(new Date(), -1) : new Date()

  return <form
    onSubmit={handleSubmit}
    className={[className, 'flex flex-col gap-4 rounded-md p-3'].join(' ')}
    tabIndex={-1}
  >
    <DateInput
      name="date"
      label="Date"
      defaultValue={values?.date ? parse(values?.date, 'yyyy-MM-dd', new Date()) : addDays(defaultDate, -1)}
    />
    <Dropdown
      label="Fic"
      name="ficId"
      defaultValue={values?.ficId || ''}
      options={fics.map(fic => ({ value: fic.id, label: fic.name }))}
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
      icon={EditCalendar}
    >
      {values?.id == null ? 'Log' : 'Update'} word count
    </Button>
    {!!values && values.id != null && (
      <Button
        style="cautionary"
        icon={DeleteForever}
        onClick={() => deleteEntry(values.id as number).then(() => onCompleted([]))}
        className='mt-4'
      >
        Delete word count
      </Button>
    )}
  </form>
}

export default DailyProjectWordCountForm