import { use, useState } from "react";
import _ from 'lodash'
import { isFuture, lastDayOfMonth, lastDayOfYear } from "date-fns";
import { Add, Edit } from '@mui/icons-material'

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";
import { MonthContext } from "@/contexts/Month/MonthContext";
import { YearContext } from "@/contexts/Year/YearContext";

import Button from "@/components/Button";
import DailyProjectWordCountForm from "@/components/DailyProjectWordCountForm";
import Modal from "@/components/Modal";
import Pill from "@/components/Pill";
import Table from "@/components/Table";

import type { WordCountEntry } from "@/types";

import { getDatesBetween } from "@/utils";

type Props = {
  showEmpty: boolean;
}
const History = ({ showEmpty }: Props) => {
  const { refreshData } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month, filteredEntries, filteredDailyTotals } = use(MonthContext)

  const [editedEntry, setEditedEntry] = useState<Partial<WordCountEntry> | null>(null)

  if (year == null) return null;

  const dates = getDatesBetween(new Date(year, month ?? 0, 1), (month == null ? lastDayOfYear : lastDayOfMonth)(new Date(year, month ?? 0, 1)))
    .filter(date => !isFuture(date))
  const filteredDates = dates.filter(date => showEmpty || _.filter(filteredEntries, { date }).length > 0)
  const fandoms = _.uniq(_.map(filteredEntries, 'fandom')).sort()

  return <>
    <Modal
      open={editedEntry != null}
      setOpen={() => setEditedEntry(null)}
    >
      <DailyProjectWordCountForm
        className='bg-zinc-800'
        values={editedEntry}
        onCompleted={() => {
          setEditedEntry(null)
          refreshData(year)
        }}
      />
    </Modal>
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
              {entries.map((entry, entryIndex) => (
                <div key={entryIndex} className="flex flex-row gap-2 items-center">
                  {entry.count}
                  <Pill style="primary">{entry.fic}</Pill>
                  <div className="grow" />
                  <Button
                    style="transparent"
                    small
                    onClick={() => setEditedEntry(entry)}
                    icon={Edit}
                  />
                </div>
              ))}
              <div className="grow" />
              {(showEmpty || entries.length === 0) && <Button
                style="transparent"
                small
                onClick={() => setEditedEntry({ fandom: fandoms[fandomIndex], date })}
                icon={Add}
                className="self-end"
              />}
            </div>),
          _.find(filteredDailyTotals, { date })?.daily_total || 0
        ]))}
      />
    </div>
  </>
}

export default History