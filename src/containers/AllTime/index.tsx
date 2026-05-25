import { use, useEffect, useState } from 'react'

import { selectRunningTotal } from '@/api'

import { YearContext } from '@/contexts/Year/YearContext'

import type { RunningTotal } from '@/types'

import RunningTotalsStackedLine from './RunningTotalsStackedLine'

const AllTime = () => {
  const { availableYears } = use(YearContext)

  const [runningTotals, setRunningTotals] = useState<RunningTotal[][]>()

  useEffect(() => {
    Promise.all(availableYears.filter(y => y != null)
      .map(selectRunningTotal))
      .then(setRunningTotals)
  }, [])

  return <div className='p-3 bg-zinc-900 rounded-md'>
    {runningTotals != null && <RunningTotalsStackedLine runningTotals={runningTotals} />}
  </div>
}

export default AllTime