import { use, useState } from "react";
import _ from 'lodash'

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";
import { MonthContext } from "@/contexts/Month/MonthContext";
import { YearContext } from "@/contexts/Year/YearContext";

import Button from "@/components/Button";
import { filterByYearAndMonth } from "@/components/Charts/YearlyCharts/utils";
import Toggle from "@/components/Toggle";

import { getDatesBetween } from "@/utils";

type Sort = 'chronological' | 'newest';
const History = () => {
  const { dailyEntries, dailyTotals, fandoms } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  const [hideEmpty, setHideEmpty] = useState<boolean>(true)
  const [sort, setSort] = useState<Sort>((month == null && year === new Date().getFullYear()) ? 'newest' : 'chronological')

  const entries = filterByYearAndMonth(dailyEntries, year, month, true)
  const totals = filterByYearAndMonth(dailyTotals, year, month, true)
  const dates = getDatesBetween(new Date(year, month ?? 0, 1), new Date(year, month ?? 11, 31));

  if (sort === 'newest') {
    dates.reverse()
  }

  return <div className="space-y-3">
    <div className="bg-zinc-800 px-4 py-1 rounded-full text-zinc-400 flex flex-row gap-4">
      <Toggle
        label="Hide empty"
        value={hideEmpty}
        onChange={setHideEmpty}
        className="text-sm"
      />
    </div>
    <table className="font-mono w-full rounded-t-xl bg-zinc-950">
      <thead className="font-medium">
        <tr className='rounded-t-xl bg-linear-45 from-pink-700/50 via-pink-400/50 to-pink-700/50 from-30% via-80% to-90%'>
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
        {dates
          .filter(date => !hideEmpty || _.sumBy(_.filter(entries, { date }), 'count') > 0)
          .map((date, rowIndex) =>
            <tr
              key={rowIndex}
              className={[
                "border-x border-primary/50",
                (rowIndex + 1) % 4 === 0 ? 'bg-pink-700/20' : '',
                (rowIndex + 3) % 4 === 0 ? 'bg-orange-700/20' : '',
              ].join(' ')}>
              {[
                'date',
                ...fandoms,
                'total'
              ].map((col, colIndex) => <td key={colIndex} className={[
                "p-2",
                (col !== 'total' && colIndex % 2 !== 0) ? "bg-pink-500/10" : "",
                col === "total" ? "bg-orange-500/10" : "",
                rowIndex === dates.length - 1 ? 'border-b border-primary/50' : ''
              ].join(' ')}>
                {col === 'date' ? date : null}
                {col === 'total' ? (_.find(totals, { date })?.daily_total || 0) : null}
                {col !== 'date' && col !== 'total' && _.sumBy(_.filter(entries, { fandom: col, date }), 'count')}
              </td>)}
            </tr>
          )}
      </tbody>
    </table>
  </div>
}

export default History