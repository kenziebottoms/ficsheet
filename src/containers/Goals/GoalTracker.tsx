import { use } from "react";
import { differenceInDays, isBefore, isPast, isSameDay, parse } from "date-fns";
import { CalendarToday, EventAvailable, Favorite, Flag, OutlinedFlag, TextSnippet, WindPower, type SvgIconComponent } from "@mui/icons-material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import _ from 'lodash'

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";

import type { Goal, GoalColor } from "@/types";

import { reformatDate } from "@/utils";

const bgClassNames: Record<GoalColor, string> = {
  'rainbow': "bg-linear-45/shorter from-indigo-600 via-orange-400 to-indigo-500 from-40% via-80% to-85%",
  'pink': "bg-linear-45/oklab from-pink-700 via-pink-400 to-pink-700 from-40% via-80% to-85%",
  'orange': "bg-linear-45/oklab from-orange-600 via-orange-400 to-orange-600 from-40% via-80% to-85%",
  'lime': 'bg-linear-45/oklab from-lime-600 via-lime-400 to-lime-600 from-40% via-80% to-85%',
  'emerald': 'bg-linear-45/oklab from-emerald-700 via-emerald-400 to-emerald-700 from-40% via-80% to-85%',
  'cyan': 'bg-linear-45/oklab from-cyan-600 via-cyan-400 to-cyan-600 from-40% via-80% to-85%',
  'indigo': 'bg-linear-45/oklab from-indigo-700 via-indigo-400 to-indigo-700 from-40% via-80% to-85%',
  'gray': 'bg-linear-45/shorter from-zinc-600 via-zinc-400 to-zinc-600 from-40% via-80% to-85%'
}
const dialColors: Record<GoalColor, string> = {
  'pink': '#f472b6',
  orange: "#f97316",
  lime: "#84cc16",
  emerald: "#03ad77",
  cyan: "#23b9ff",
  indigo: "#7c86ff",
  rainbow: "#f472b6",
  gray: "#999"
}
const titleClassNames: Record<GoalColor, string> = {
  'pink': 'text-pink-300',
  orange: "text-orange-300",
  lime: "text-lime-200",
  emerald: "text-emerald-200",
  cyan: "text-cyan-200",
  indigo: "text-indigo-300",
  rainbow: "text-purple-300",
  gray: "text-zinc-300"
}

const GoalTracker = ({
  startDate,
  endDate,
  name,
  targetWordCount,
  fic,
  fandom,
  ship,
  color = 'pink'
}: Goal) => {
  const { dailyEntries } = use(DataCacheContext)
  const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date())
  const parsedEndDate: Date | null = endDate == null ? null : parse(endDate, 'yyyy-MM-dd', new Date())

  const filteredEntries = dailyEntries
    .filter(entry => {
      const entryDate = parse(entry.date, 'yyyy-MM-dd', new Date())
      return (
        isBefore(parsedStartDate, entryDate) || isSameDay(parsedStartDate, entryDate)
      ) && (
          parsedEndDate == null || (isBefore(entryDate, parsedEndDate) || isSameDay(parsedEndDate, entryDate))
        )
    })
    .filter(entry => (fic == null || entry.fic === fic)
      && (fandom == null || entry.fandom === fandom)
      && (ship == null || entry.ship === ship))
  const wordsWritten = _.sumBy(filteredEntries, 'count')

  return <div className={`rounded-xl flex flex-row flex-wrap lg:flex-nowrap items-center justify-center md:justify-between gap-x-2 gap-y-1 p-1 ${bgClassNames[color]}`}>
    <div className="flex flex-row gap-1 items-center grow lg:grow-0 w-3/4 lg:w-auto">
      <div className="pr-1">{wordsWritten >= targetWordCount ? <Flag /> : <OutlinedFlag />}</div>

      <div className={`px-5 py-1 grow lg:grow-0 text-lg bg-zinc-800 inset-shadow-black/50 inset-shadow-sm rounded-full font-sans ${titleClassNames[color]}`}>{name}</div>
    </div>

    <div className="lg:order-last flex flex-row gap-3 items-center">
      <div className="bg-zinc-900 rounded-full flex flex-row items-center">
        <Gauge
          width={70}
          height={70}
          valueMin={0}
          valueMax={targetWordCount}
          value={Math.min(wordsWritten, targetWordCount)}
          className={`text-sm ${endDate == null ? '' : '-mr-2'}`}
          sx={{
            [`& .${gaugeClasses.valueArc}`]: {
              fill: dialColors[color],
            },
          }}
          text=""
        />
        {parsedEndDate != null && <Gauge
          width={50}
          height={50}
          valueMin={0}
          valueMax={Math.ceil(differenceInDays(parsedEndDate, parsedStartDate))}
          value={differenceInDays(new Date(), parsedStartDate)}
          className='text-sm -ml-10 mr-2'
          sx={{
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#fff8",
            },
          }}
          text=""
        />}
      </div>
    </div>

    <div className="flex grow text-sm flex-row flex-wrap items-center justify-around gap-1">
      <div className='whitespace-nowrap px-2 py-1 bg-zinc-900/50 rounded-md flex flex-row gap-2 items-center inset-shadow-background/25 inset-shadow-sm'>
        <div>{reformatDate(startDate, 'yyyy-MM-dd', 'MMM d, \'\'yy')}</div>
        {(parsedEndDate == null ? (wordsWritten >= targetWordCount) : isPast(parsedEndDate)) ?
          <EventAvailable htmlColor={dialColors[color]} /> :
          <CalendarToday htmlColor={dialColors[color]} />}
        {endDate != null && <div>{reformatDate(endDate, 'yyyy-MM-dd', 'MMM d, \'\'yy')}</div>}
      </div>

      {([
        [WindPower, fandom],
        [Favorite, ship],
        [TextSnippet, fic]
      ] as [SvgIconComponent, string][])
        .filter(([, text]) => text != null)
        .map(([Icon, text]) => <div key={text} className="bg-zinc-900/50 rounded-md py-1 px-2 flex flex-row items-center gap-2 inset-shadow-background/25 inset-shadow-sm">
          <Icon htmlColor={dialColors[color]} />
          {text}
        </div>)}
    </div>

    <div className="whitespace-nowrap bg-white/50 rounded-full py-1 px-3 font-sans text-zinc-900">{wordsWritten.toLocaleString()} / {targetWordCount.toLocaleString()}</div>
  </div>
}

export default GoalTracker