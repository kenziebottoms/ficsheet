import { use, useEffect, useState } from 'react'

import { selectRunningTotal } from '@/api'

import { YearContext } from '@/contexts/Year/YearContext'

import type { RunningTotal } from '@/types'

import LifetimeWordCountLineChart from './LifetimeWordCountLineChart'
import YearlyRunningWordCountLineChart from './YearlyRunningWordCountLineChart'

const AllTime = () => {
  const { availableYears } = use(YearContext)

  const [runningTotals, setRunningTotals] = useState<RunningTotal[][]>()
  const [lifetimeRunningTotal, setLifetimeRunningTotal] = useState<RunningTotal[]>([])

  useEffect(() => {
    Promise.all(availableYears.filter(y => y != null)
      .map(selectRunningTotal))
      .then(setRunningTotals)

    selectRunningTotal().then(setLifetimeRunningTotal)
  }, [])

  return <div className='p-3 bg-zinc-900 rounded-md flex flex-col gap-2 items-center'>
    <YearlyRunningWordCountLineChart runningTotals={runningTotals} />
    <LifetimeWordCountLineChart lifetimeRunningTotal={lifetimeRunningTotal} />
  </div>
}

export default AllTime