import { use, useState } from "react";
import _ from 'lodash'
import { isFuture, lastDayOfMonth, lastDayOfYear } from "date-fns";
import { Add } from '@mui/icons-material'

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";
import { MonthContext } from "@/contexts/Month/MonthContext";
import { YearContext } from "@/contexts/Year/YearContext";

import Button from "@/components/Button";
import DailyProjectWordCountForm from "@/components/DailyProjectWordCountForm";
import Modal from "@/components/Modal";
import Table from "@/components/Table";

import type { WordCountEntry } from "@/types";

import { getDatesBetween } from "@/utils";
import EntryButton from "./EntryButton";

type Props = {
  showEmpty: boolean;
}
const History = ({ showEmpty }: Props) => {
  const { refreshData } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month, filteredEntries, filteredDailyTotals } = use(MonthContext)

  const [newEntry, setNewEntry] = useState<Omit<WordCountEntry, 'fic' | 'count'> | null>(null)

  if (year == null) return null;

  const dates = getDatesBetween(new Date(year, month ?? 0, 1), (month == null ? lastDayOfYear : lastDayOfMonth)(new Date(year, month ?? 0, 1)))
    .filter(date => !isFuture(date))
  const filteredDates = dates.filter(date => showEmpty || _.filter(filteredEntries, { date }).length > 0)
  const fandoms = _.uniq(_.map(filteredEntries, 'fandom')).sort()

  return <>
    {newEntry != null && <Modal
      open
      setOpen={(newOpen: boolean) => {
        if (!newOpen) {
          setNewEntry(null)
        }
      }}
    >
      <DailyProjectWordCountForm
        className='bg-zinc-800'
        values={newEntry}
        onCompleted={() => {
          setNewEntry(null)
          refreshData(year)
        }}
      />
    </Modal>}
    <div className="overflow-auto w-full">
      <Table
        headers={[
          'Date',
          ...fandoms,
          'Total',
        ]}
        data={filteredDates.map((date) => ([
          `${parseInt(date.substring(5, 7), 10)}/${parseInt(date.substring(8, 10), 10)}/${date.substring(2, 4)}`,
          ...fandoms
            // map fandoms to list of fandom entries
            .map(fandom => _.filter(filteredEntries, { fandom, date }))
            .map((entries, fandomIndex) => <div className="p-1 gap-y-1 flex flex-row flex-wrap gap-2">
              {entries.map((entry) => <EntryButton key={entry.id} entry={entry} />)}
              <div className="grow" />
              <Button
                style="transparent"
                small
                onClick={() => setNewEntry({ fandom: fandoms[fandomIndex], date })}
                icon={Add}
                className="self-end"
              />
            </div>),
          <span className="font-bold">{_.find(filteredDailyTotals, { date })?.daily_total || 0}</span>
        ]))}
      />
    </div>
  </>
}

export default History