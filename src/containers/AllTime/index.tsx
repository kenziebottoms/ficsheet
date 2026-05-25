import { use, useEffect, useState } from 'react'

import { selectFandomTotals, selectRunningTotal } from '@/api'

import { YearContext } from '@/contexts/Year/YearContext'

import type { FandomTotal, RunningTotal } from '@/types'

import AllTimeFandomPieChart from './AllTimeFandomPieChart'
import LifetimeWordCountLineChart from './LifetimeWordCountLineChart'
import YearlyRunningWordCountLineChart from './YearlyRunningWordCountLineChart'

const AllTime = () => {
  const { availableYears } = use(YearContext)

  const [runningTotals, setRunningTotals] = useState<RunningTotal[][]>()
  const [lifetimeRunningTotal, setLifetimeRunningTotal] = useState<RunningTotal[]>([])
  const [fandomTotals, setFandomTotals] = useState<FandomTotal[]>([])

  useEffect(() => {
    Promise.all(availableYears.filter(y => y != null)
      .map(selectRunningTotal))
      .then(setRunningTotals)

    selectRunningTotal().then(setLifetimeRunningTotal)

    selectFandomTotals().then(setFandomTotals)
  }, [])

  return <div className='p-3 bg-zinc-900 rounded-md flex flex-col gap-2 items-center'>
    <YearlyRunningWordCountLineChart runningTotals={runningTotals} />
    <AllTimeFandomPieChart fandomTotals={fandomTotals} />
    <LifetimeWordCountLineChart lifetimeRunningTotal={lifetimeRunningTotal} />
  </div>
}

export default AllTime