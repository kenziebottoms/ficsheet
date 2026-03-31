import { use, useState } from "react";
import _ from 'lodash'
import { lastDayOfMonth, lastDayOfYear } from "date-fns";

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
  const dates = getDatesBetween(new Date(year, month ?? 0, 1), (month == null ? lastDayOfYear : lastDayOfMonth)(new Date(year, month ?? 0, 1)));
  const filteredDates = dates.filter(date => !hideEmpty || _.filter(entries, { date }).length > 0)
  if (sort === 'newest') {
    filteredDates.reverse()
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
                  // map fandoms to daily fandom total so we can style based on value
                  .map(fandom => _.sumBy(_.filter(entries, { fandom, date }), 'count'))
                  .map((fandomTotal, fandomIndex) => <td
                    key={fandomIndex}
                    className={[
                      "p-2",
                      (fandomIndex % 2 === 0) ? "bg-pink-500/10" : "",
                      rowIndex === filteredDates.length - 1 ? 'border-b border-primary/50' : '',
                      fandomTotal === 0 ? 'text-foreground/50' : ''
                    ].join(' ')}
                  >
                    {fandomTotal}
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
}

export default History