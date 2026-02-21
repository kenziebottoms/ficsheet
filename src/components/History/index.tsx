import type { DailyWordCountEntry } from "../../types"

const History = () => {
  const dailyEntries: DailyWordCountEntry[] = [
    {
      date: '2026-01-27',
      fic: 'transception',
      fandom: 'Inception',
      wordCount: 131,
    },
    {
      date: '2026-02-12',
      fic: 'muzzled max 3',
      fandom: 'Mad Max',
      wordCount: 47,
    },
    {
      date: '2026-02-13',
      fic: 'muzzled max 3',
      fandom: 'Mad Max',
      wordCount: 64,
    },
    {
      date: '2026-02-14',
      fic: 'muzzled max 3',
      fandom: 'Mad Max',
      wordCount: 133,
    },
  ]
  
  return <table className="border border-zinc-500 w-full">
    <thead>
      <tr>
        <th>Date</th>
        <th>Fic</th>
        <th>Fandom</th>
        <th className="whitespace-nowrap">Word Count</th>
      </tr>
    </thead>
    <tbody>
      {dailyEntries
        .sort(({ date: dateA }, { date: dateB }) => dateA.localeCompare(dateB))
        .map((row, i) =>
          <tr key={i} className={`bg-zinc-${8 + (i % 2)}00`}>
            {[
              'date',
              'fic',
              'fandom',
              'wordCount'
            ].map((col, j) => <td key={j} className="border-y border-zinc-950 p-2">
              {row[col as keyof DailyWordCountEntry]}
            </td>)}
          </tr>
        )}
    </tbody>
  </table>
}

export default History