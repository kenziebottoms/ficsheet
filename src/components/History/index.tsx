import { useState } from "react";

import type { DailyWordCountEntry } from "../../types"

import Button from "../Button";

import DailyProjectWordCountForm from "./DailyProjectWordCountForm";

type Props = {
  className?: string;
  dailyEntries: DailyWordCountEntry[];
}
const History = ({
  dailyEntries,
  className = ''
}: Props) => {
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false)

  return <div className={["p-3 space-y-3", className].join(" ")}>
    <div className="flex flex-row gap-2">
      <h2 className="grow">History</h2>
      <Button style="primary" onClick={() => setShowEntryForm(!showEntryForm)}>Log</Button>
    </div>

    {showEntryForm && <DailyProjectWordCountForm className="bg-zinc-800 my-4" />}

    <table className="font-mono w-full rounded-t-xl bg-zinc-950">
      <thead className="font-medium">
        <tr className='rounded-t-xl bg-linear-45 from-pink-700/50 via-pink-400/50 to-pink-700/50 from-30% via-80% to-90%'>
          {[
            'Date',
            'Fic',
            'Fandom',
            'Word Count',
          ].map((label, i) => <th
            key={label}
            className={[
              "whitespace-nowrap font-mono text-lg",
              i === 0 ? "rounded-tl-xl" : "",
              i === 3 ? "rounded-tr-xl" : "",
              i % 4 === 0 ? "bg-pink-400/25" : "",
              (i + 2) % 4 === 0 ? "bg-orange-400/25" : "",
            ].join(" ")}
          >
            {label}
          </th>)}
        </tr>
      </thead>
      <tbody className="font-normal">
        {dailyEntries.map((row, rowIndex) =>
          <tr
            key={rowIndex}
            className={[
              "border-x border-primary/50",
              (rowIndex + 1) % 4 === 0 ? 'bg-pink-700/20' : '',
              (rowIndex + 3) % 4 === 0 ? 'bg-orange-700/20' : '',
            ].join(' ')}>
            {[
              'date',
              'fic',
              'fandom',
              'count'
            ].map((col, colIndex) => <td key={colIndex} className={[
              "p-2",
              colIndex % 4 === 0 ? "bg-pink-500/10" : "",
              (colIndex + 2) % 4 === 0 ? "bg-orange-500/10" : "",
              rowIndex === dailyEntries.length - 1 ? 'border-b border-primary/50' : ''
            ].join(' ')}>
              {row[col as keyof DailyWordCountEntry]}
            </td>)}
          </tr>
        )}
      </tbody>
    </table>
  </div>
}

export default History