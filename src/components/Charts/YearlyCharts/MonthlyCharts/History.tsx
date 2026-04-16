import { use, useState } from "react";
import _ from 'lodash'
import { isFuture, lastDayOfMonth, lastDayOfYear } from "date-fns";
import { Add, DeleteOutline, Edit } from '@mui/icons-material'

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";
import { MonthContext } from "@/contexts/Month/MonthContext";
import { YearContext } from "@/contexts/Year/YearContext";

import Button from "@/components/Button";
import DailyProjectWordCountForm from "@/components/DailyProjectWordCountForm";
import Modal from "@/components/Modal";
import Pill from "@/components/Pill";
import Toggle from "@/components/Toggle";
import { filterByYearAndMonth } from "@/components/Charts/YearlyCharts/utils";

import type { WordCountEntry } from "@/types";

import { getDatesBetween } from "@/utils";
import { deleteEntry } from "@/api";


type Sort = 'chronological' | 'newest';
const History = () => {
  const { dailyEntries, dailyTotals, refreshData } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  const [showEmpty, setShowEmpty] = useState<boolean>(false)
  const [sort, setSort] = useState<Sort>((month == null && year === new Date().getFullYear()) ? 'newest' : 'chronological')
  const [editedEntry, setEditedEntry] = useState<Partial<WordCountEntry> | null>(null)

  const entries = filterByYearAndMonth(dailyEntries, year, month, true)
  const totals = filterByYearAndMonth(dailyTotals, year, month, true)
  const dates = getDatesBetween(new Date(year, month ?? 0, 1), (month == null ? lastDayOfYear : lastDayOfMonth)(new Date(year, month ?? 0, 1)))
    .filter(date => !isFuture(date))
  const filteredDates = dates.filter(date => showEmpty || _.filter(entries, { date }).length > 0)
  if (sort === 'newest') {
    filteredDates.reverse()
  }
  const fandoms = _.uniq(_.map(entries, 'fandom')).sort()

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
    <div className="space-y-3">
      <div className="bg-zinc-800 px-4 py-1 rounded-full text-zinc-400 flex flex-row gap-4">
        <Toggle
          label="Show empty"
          value={showEmpty}
          onChange={setShowEmpty}
          className="text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="font-mono w-full rounded-t-xl bg-zinc-950">
          <thead className="font-medium">
            <tr className='rounded-t-xl bg-pink-700/50 from-30% via-80% to-90%'>
              {[
                'Date',
                ...fandoms,
                'Total',
              ].map((label, i) => <th
                key={label}
                className={[
                  "whitespace-nowrap font-mono text-lg",
                  label === 'Date' ? "rounded-tl-xl cursor-pointer flex flex-row gap-2 items-center justify-between" : "",
                  label === 'Total' ? "rounded-tr-xl bg-orange-400/25" : "",
                  (label !== "Total" && i % 2 !== 0) ? "bg-pink-400/25" : "",
                ].join(" ")}
                onClick={() => {
                  if (label === "Date") {
                    setSort(sort === 'chronological' ? "newest" : "chronological")
                  }
                }}
              >
                {label}
                {label === "Date" && <Button
                  small
                  style="secondary"
                >
                  {sort === 'chronological' ? '↓' : '↑'}
                </Button>}
              </th>)}
            </tr>
          </thead>
          <tbody className="font-normal">
            {filteredDates
              .map((date, rowIndex) =>
                <tr
                  key={rowIndex}
                  className={[
                    "border-x border-primary/50",
                    (rowIndex + 1) % 4 === 0 ? 'bg-pink-700/20' : '',
                    (rowIndex + 3) % 4 === 0 ? 'bg-orange-700/20' : '',
                  ].join(' ')}
                >
                  <td className="whitespace-nowrap">
                    {parseInt(date.substring(5, 7), 10)}/{parseInt(date.substring(8, 10), 10)}/{date.substring(2, 4)}
                  </td>
                  {fandoms
                    // map fandoms to list of fandom entries
                    .map(fandom => _.filter(entries, { fandom, date }))
                    .map((entries, fandomIndex) => <td
                      key={fandomIndex}
                      className={[
                        (fandomIndex % 2 === 0) ? "bg-pink-500/10" : "",
                        rowIndex === filteredDates.length - 1 ? 'border-b border-primary/50' : '',
                        _.sumBy(entries, 'count') === 0 ? 'text-foreground/50' : ''
                      ].join(' ')}
                    >
                      <div className="p-2 gap-y-1 flex flex-col">
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
                            {entry.id != null && <Button
                              style="cautionary"
                              small
                              onClick={() => deleteEntry(entry.id as number).then(() => refreshData(year))}
                              icon={DeleteOutline}
                            />}
                          </div>
                        ))}
                        {(showEmpty || entries.length === 0) && <Button
                          style="transparent"
                          small
                          onClick={() => setEditedEntry({ fandom: fandoms[fandomIndex], date })}
                          icon={Add}
                          className="self-end"
                        />}
                      </div>
                    </td>)}
                  <td className="bg-orange-500/10">
                    {_.find(totals, { date })?.daily_total || 0}
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </div>
  </>
}

export default History