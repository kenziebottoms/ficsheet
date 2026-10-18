import { use } from 'react'

import { YearContext } from '@/contexts/Year/YearContext'

import type { GoalColor } from '@/types'

import GoalTracker from './GoalTracker'
import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'

const Goals = () => {
  const { year } = use(YearContext)
  const { goals } = use(DataCacheContext)

  if (year == null) return null;

  return <div className='flex flex-col gap-2 bg-zinc-800 rounded-md p-2'>
    {goals.map(goal => <GoalTracker
      key={goal.id}
      {...goal}
      color={goal.color as GoalColor}
    />)}
  </div>
}

export default Goals