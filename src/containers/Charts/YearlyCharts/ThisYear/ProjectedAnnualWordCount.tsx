import { use } from 'react'
import { getDayOfYear, isLeapYear } from 'date-fns'
import { Gauge } from '@mui/x-charts'

import Badge from '@/components/Badge'
import Widget from '@/components/Widget'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'

import type { ContainerProps } from '@/types'

const ProjectedAnnualWordCount = ({
  className = ''
}: ContainerProps) => {
  const { runningTotal } = use(DataCacheContext)

  if (runningTotal.length === 0) {
    return null
  }

  const { running_total } = runningTotal[runningTotal.length - 1]
  const year = new Date().getFullYear()
  const daysInYear = isLeapYear(year) ? 366 : 365
  const daysPast = getDayOfYear(new Date())

  return <div className={['py-2 px-16 w-auto bg-zinc-700 rounded-full flex flex-row items-center gap-4', className].join(" ")}>
    <Badge style="secondary" title="Total Words Written">
      {running_total}
    </Badge>
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
    <Badge style="primary" title={(<>Projected Annual<br />Word Count</>)}>
      {(running_total * (daysInYear / daysPast)).toFixed(0)}
    </Badge>
  </div>
}

export default ProjectedAnnualWordCount