import { use, useState, type SubmitEventHandler } from 'react';
import { addDays, isBefore, parse } from 'date-fns';
import { Add, ArrowDropDown, DeleteForever, EditCalendar } from '@mui/icons-material';

import { deleteEntry, submitEntryForm } from '@/api';

import Button from '@/components/Button';
import DateInput from '@/components/DateInput';
import FicDropdown from '@/components/FicDropdown';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import Toggle from '@/components/Toggle';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import type { EntryFormValues, WordCountEntry } from '@/types';
import { countWords } from '@/utils';


type Props = {
  className?: string;
  values?: Partial<WordCountEntry> | null;
  onCompleted?: (response: WordCountEntry[] | null) => void;
}
const EntryForm = ({
  className = '',
  values,
  onCompleted: _onCompleted = () => { },
}: Props) => {
  const { year, refreshYears } = use(YearContext)
  const { refreshData } = use(DataCacheContext)

  const [showTextarea, setShowTextarea] = useState<boolean>(!values)
  const [typeNewFic, setTypeNewFic] = useState<boolean>(false)

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

    const formData = Object.fromEntries(new FormData(e.target).entries()) as Record<string, string>;
    const payload: EntryFormValues = {
      id: parseInt(formData.id || '', 10) || null,
      date: formData.date,
      fandom: formData.fandom || null,
      fic: formData.fic || null,
      ficId: parseInt(formData.ficId, 10) || null,
      count: parseInt(formData.count, 10) || countWords(formData.pastedWords),
      ship: formData.ship || null,
    }

    if (payload.count !== 0) {
      submitEntryForm(payload).then(response => onCompleted([response]))
    } else if (payload.id != null) {
      deleteEntry(payload.id).then(() => onCompleted([]))
    }
  }

  // default to today (unless it's after midnight but before 4AM, then default to "yesterday")
  const defaultDate = isBefore(new Date(), new Date().setHours(4)) ? addDays(new Date(), -1) : new Date()

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

    <DateInput
      name="date"
      label="Date"
      defaultValue={values?.date ? parse(values?.date, 'yyyy-MM-dd', new Date()) : addDays(defaultDate, -1)}
    />

    <div className='flex flex-row gap-2'>
      {typeNewFic ?
        <Input
          label="Fic"
          name="fic"
          type="text"
          defaultValue={values?.fic}
          className='grow'
        /> :
        <FicDropdown
          label="Fic"
          name="ficId"
          defaultValue={values?.ficId}
          className="grow"
        />}
      <Button
        icon={typeNewFic ? ArrowDropDown : Add}
        onClick={() => setTypeNewFic(!typeNewFic)}
        style="transparent"
        small
        className='self-end pt-2 pb-2'
        label={typeNewFic ? "Select existing fic" : "Add new fic"}
      />
    </div>

    {typeNewFic && <Input
      label="Fandom"
      name="fandom"
      type="text"
      defaultValue={values?.fandom}
    />}

    {typeNewFic && <Input
      label="Ship"
      name="ship"
      type="text"
      defaultValue={values?.ship}
    />}

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
        defaultValue={values?.count}
      />}

    <Button
      type="submit"
      style="primary"
      icon={EditCalendar}
    >
      {values?.id == null ? 'Log' : 'Update'} word count
    </Button>
    {values?.id != null && (
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

export default EntryForm