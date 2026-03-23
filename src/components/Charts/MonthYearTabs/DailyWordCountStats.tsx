import { use } from 'react'
import _ from 'lodash'

import { DataCacheContext } from '../../../contexts/DataCache/DataCacheContext'

import Badge from '../../Badge'

import DailyTotalSparkline from './DailyTotalSparkline'
import type { MonthYearChartProps } from './types'
import { filterByTimeframe } from './utils'

const DailyWordCountStats = ({
  timeframe
}: MonthYearChartProps) => {
  const { dailyEntries } = use(DataCacheContext)
  const filteredEntries = filterByTimeframe(dailyEntries, timeframe)

  return (
    <div className='bg-zinc-800 p-3 rounded-md space-y-3 w-auto flex flex-col items-start'>
      <DailyTotalSparkline timeframe={timeframe} />
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