import { use } from 'react'
import _ from 'lodash'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'
import { MonthContext } from '@/contexts/Month/MonthContext'
import { YearContext } from '@/contexts/Year/YearContext'

import Badge from '@/components/Badge'

import { filterByYearAndMonth } from '../utils'

import DailyTotalSparkline from './DailyTotalSparkline'

const DailyWordCountStats = () => {
  const { dailyEntries } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)
  const filteredEntries = filterByYearAndMonth(dailyEntries, year, month, true)

  return (
    <div className='bg-zinc-900 p-3 rounded-md space-y-3 w-auto flex flex-col items-start'>
      <DailyTotalSparkline />
      <div className='flex flex-row flex-wrap gap-3'>
        <Badge title="Maximum" style="primary">
          <span className='font-semibold text-white'>{_.maxBy(filteredEntries, 'count')?.count || 0}</span> words
        </Badge>
        <Badge title="Average" style="secondary">
          <span className='font-semibold text-white'>{_.meanBy(filteredEntries, 'count').toFixed(1)}</span> words
        </Badge>
        <Badge title="Minimum" style="subtle">
          <span className='font-semibold text-white'>{_.minBy(filteredEntries, 'count')?.count || 0}</span> words
        </Badge>
      </div>
    </div>
  )
}

export default DailyWordCountStats