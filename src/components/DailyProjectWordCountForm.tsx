import { use, useEffect, useState, type SubmitEventHandler } from 'react';
import { addDays, isBefore, parse } from 'date-fns';
import { Add, DeleteForever, EditCalendar, Restore } from '@mui/icons-material';
import _ from 'lodash';

import { deleteEntry, selectFics, submitDailyProjectWordCountForm } from '@/api';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import type {
  DailyWordCountFormValues,
  DailyWordCountRawFormValues,
  Fic,
  WithId,
  WordCountEntry
} from '@/types';
import { countWords } from '@/utils';

import Button from './Button';
import DateInput from './DateInput';
import Dropdown from './Dropdown';
import Input from './Input';
import TextArea from './TextArea';
import Toggle from './Toggle';

type Props = {
  className?: string;
  values?: Partial<WordCountEntry> | null;
  onCompleted?: (response: WordCountEntry[] | null) => void;
}
const DailyWordCountForm = ({
  className = '',
  values,
  onCompleted: _onCompleted = () => { },
}: Props) => {
  const { year, refreshYears } = use(YearContext)
  const { fics, refreshData } = use(DataCacheContext)

  const [allFics, setAllFics] = useState<WithId<Fic>[]>([])
  const [showOldFics, setShowOldFics] = useState<boolean>(false)
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

    const formData = Object.fromEntries(new FormData(e.target).entries()) as DailyWordCountRawFormValues;
    const payload: DailyWordCountFormValues = {
      id: parseInt(formData.id || '', 10) || null,
      date: formData.date,
      fandom: formData.fandom || null,
      fic: formData.fic || null,
      ficId: parseInt(formData.ficId || '', 10) || null,
      count: parseInt(formData.count || '', 10) || countWords(formData.pastedWords),
      ship: formData.ship || null,
    }

    if (payload.count !== 0) {
      submitDailyProjectWordCountForm(payload).then(response => onCompleted([response]))
    } else if (payload.id != null) {
      deleteEntry(payload.id).then(() => onCompleted([]))
    }
  }

  // default to today (unless it's after midnight but before 4AM, then default to "yesterday")
  const defaultDate = isBefore(new Date(), new Date().setHours(4)) ? addDays(new Date(), -1) : new Date()

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
        /> :
        <Dropdown
          label="Fic"
          name="ficId"
          defaultValue={values?.ficId}
          options={(showOldFics ? allFics : fics).map(fic => ({ value: fic.id, label: fic.name }))}
        />}
      {!showOldFics && !typeNewFic && (
        <Button
          icon={Restore}
          onClick={() => setShowOldFics(true)}
          style="transparent"
          small
          className='self-end'
          aria-label="Show Older Fics"
        />
      )}
      {!typeNewFic && (
        <Button
          icon={Add}
          onClick={() => setTypeNewFic(true)}
          style="transparent"
          small
          className='self-end'
          aria-label="Add new fic"
        />
      )}
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

export default DailyWordCountForm