import type { DailyWordCountEntry } from "../../../types"


const History = () => {
  const dailyEntries: DailyWordCountEntry[] = [
    {
      date: '2026-01-27',
      fic: 'transception',
      fandom: 'Inception',
      wordCount: 131,
    },
    {
      date: '2026-01-28',
      fic: 'transception',
      fandom: 'Inception',
      wordCount: 13,
    },
    {
      date: '2026-01-29',
      fic: 'transception',
      fandom: 'Inception',
      wordCount: 24,
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
      <tr className='bg-linear-45 from-pink-500/50 via-pink-400/50 to-pink-700/50 from-30% via-80% to-90%'>
        {[
          'Date',
          'Fic',
          'Fandom',
          'Word Count',
        ].map((label, i) => <th
          key={label}
          className={[
            "whitespace-nowrap font-mono text-lg font-medium",
            i % 4 === 0 ? "bg-pink-400/25" : "",
            (i + 2) % 4 === 0 ? "bg-orange-300/25" : "",
          ].join(" ")}
        >
          {label}
        </th>)}
      </tr>
    </thead>
    <tbody>
      {dailyEntries
        .sort(({ date: dateA }, { date: dateB }) => dateA.localeCompare(dateB))
        .map((row, i) =>
          <tr
            key={i}
            className={[
              (i + 1) % 4 === 0 ? 'bg-pink-700/25' : '',
              (i + 3) % 4 === 0 ? 'bg-orange-700/25' : '',
            ].join(' ')}>
            {[
              'date',
              'fic',
              'fandom',
              'wordCount'
            ].map((col, j) => <td key={j} className={[
              "border border-collapse border-zinc-700 p-2",
              j % 4 === 0 ? "bg-pink-500/10" : "",
              (j + 2) % 4 === 0 ? "bg-orange-500/10" : "",
            ].join(' ')}>
              {row[col as keyof DailyWordCountEntry]}
            </td>)}
          </tr>
        )}
    </tbody>
  </table>
}

export default History