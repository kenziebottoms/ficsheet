import { use } from 'react'
import { getDayOfYear, isLeapYear } from 'date-fns'
import { Gauge } from '@mui/x-charts'

import Badge from '@/components/Badge'
import Widget from '@/components/Widget'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'

type Props = {
  className?: string;
}
const ProjectedAnnualWordCount = ({
  className = ''
}: Props) => {
  const { runningTotal } = use(DataCacheContext)

  if (runningTotal.length === 0) {
    return null
  }

  const { running_total } = runningTotal[runningTotal.length - 1]
  const year = new Date().getFullYear()
  const daysInYear = isLeapYear(year) ? 366 : 365
  const daysPast = getDayOfYear(new Date())

  return <div className={['p-2 bg-zinc-700 rounded-full flex flex-row justify-center items-center gap-4', className].join(" ")}>
    <Badge style="secondary" title="Total Words Written">
      {running_total}
    </Badge>
    <span className='text-6xl font-light text-zinc-300 font-mono'>x</span>
    <Widget title="Days past" className='items-center'>
      <Gauge
        width={100}
        height={100}
        valueMin={0}
        valueMax={daysInYear}
        value={daysPast}
        className='mx-auto'
      />
    </Widget>
    <span className='text-6xl font-light text-zinc-300 font-mono'>=</span>
    <Badge style="primary" title={(<>Projected Annual<br />Word Count</>)}>
      {(running_total * (daysInYear / daysPast)).toFixed(0)}
    </Badge>
  </div>
}

export default ProjectedAnnualWordCount