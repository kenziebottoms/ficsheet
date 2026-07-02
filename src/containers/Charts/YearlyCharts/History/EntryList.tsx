import { memo, use } from 'react'
import { isFuture, lastDayOfMonth, lastDayOfYear } from "date-fns";
import _ from 'lodash';
import { Add } from '@mui/icons-material';

import Button from '@/components/Button';
import Table from '@/components/Table'

import { MonthContext } from '@/contexts/Month/MonthContext'
import { YearContext } from '@/contexts/Year/YearContext'

import type { WordCountEntry } from '@/types';
import { getDatesBetween } from '@/utils'

import EntryButton from './EntryButton';

const EntryList = memo(({
  showEmpty,
  setEditedEntry,
}: {
  showEmpty: boolean;
  setEditedEntry: (entry: Partial<WordCountEntry>) => void;
}) => {
  const { year } = use(YearContext)
  const { month, filteredEntries, filteredDailyTotals } = use(MonthContext)

  if (year == null) return null;

  const dates = getDatesBetween(new Date(year, month ?? 0, 1), (month == null ? lastDayOfYear : lastDayOfMonth)(new Date(year, month ?? 0, 1)))
    .filter(date => !isFuture(date))
  const filteredDates = dates.filter(date => showEmpty || _.filter(filteredEntries, { date }).length > 0)

  return <Table
    headers={[
      'Date',
      'Entries',
      'Total',
    ]}
    data={filteredDates
      .map((date) => ({ date, entries: _.filter(filteredEntries, { date }) }))
      .map(({ date, entries }) => [
        `${parseInt(date.substring(5, 7), 10)}/${parseInt(date.substring(8, 10), 10)}/${date.substring(2, 4)}`,
        <div className="p-1 gap-y-1 flex flex-row flex-wrap gap-2">
          {entries.map((entry) => <EntryButton key={entry.id} entry={entry} onClick={setEditedEntry} />)}
          <div className="grow" />
          <Button
            style="transparent"
            small
            onClick={() => setEditedEntry({ date })}
            icon={Add}
            className="self-end"
          />
        </div>,
        <span className="font-bold">{_.find(filteredDailyTotals, { date })?.daily_total || 0}</span>
      ])}
  />
})

export default EntryList