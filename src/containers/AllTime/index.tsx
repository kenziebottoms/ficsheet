import { use, useEffect, useState } from 'react'
import { ContentPaste } from '@mui/icons-material'

import { exportData, selectFandoms, selectRunningTotal, selectShips } from '@/api'

import Badge from '@/components/Badge'
import Button from '@/components/Button'

import { YearContext } from '@/contexts/Year/YearContext'

import type { Fandom, RunningTotal, Ship } from '@/types'

import { copyPrettyJson } from '@/utils'

import AllTimeFandomPieChart from './AllTimeFandomPieChart'
import FandomLeaderboard from './FandomLeaderboard'
import ShipLeaderboard from './ShipLeaderboard'
import LifetimeWordCountLineChart from './LifetimeWordCountLineChart'
import YearlyRunningWordCountLineChart from './YearlyRunningWordCountLineChart'

const AllTime = () => {
  const { availableYears } = use(YearContext)

  const [runningTotals, setRunningTotals] = useState<RunningTotal[][]>()
  const [lifetimeRunningTotal, setLifetimeRunningTotal] = useState<RunningTotal[]>([])
  const [fandoms, setFandoms] = useState<Fandom[]>([])
  const [ships, setShips] = useState<Ship[]>([])

  useEffect(() => {
    Promise.all(availableYears.filter(y => y != null)
      .map(selectRunningTotal))
      .then(setRunningTotals)

    selectRunningTotal().then(setLifetimeRunningTotal)

    selectFandoms().then(setFandoms)

    selectShips().then(setShips)
  }, [])

  if (runningTotals == null || lifetimeRunningTotal.length === 0) return null;

  return <div className='p-3 bg-zinc-900 rounded-md flex flex-col gap-3 items-center'>
    <div className='flex flex-row gap-3'>
      <Badge title='Total Words Written'>
        {lifetimeRunningTotal[lifetimeRunningTotal.length - 1].running_total.toLocaleString('en-US')}
      </Badge>
      <Badge
        title="Total Fandoms"
        style="secondary"
      >
        {fandoms.length}
      </Badge>
      <Button
        style="transparent"
        icon={ContentPaste}
        onClick={() => exportData().then(copyPrettyJson)}
        className='self-start'
      >
        Export
      </Button>
    </div>
    <div className='flex flex-row gap-2'>
      <FandomLeaderboard fandoms={fandoms} />
      <ShipLeaderboard ships={ships} />
    </div>
    <YearlyRunningWordCountLineChart runningTotals={runningTotals} />
    <AllTimeFandomPieChart fandoms={fandoms} />
    <LifetimeWordCountLineChart lifetimeRunningTotal={lifetimeRunningTotal} />
  </div >
}

export default AllTime