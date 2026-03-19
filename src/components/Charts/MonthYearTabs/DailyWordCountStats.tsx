import { use } from 'react'
import _ from 'lodash'

import { DataCacheContext } from '../../../contexts/DataCache/DataCacheContext'

import Badge from '../../Badge'

import { filterByTimeframe } from './utils'
import type { MonthYearChartProps } from './types'

const DailyWordCountStats = ({
  timeframe
}: MonthYearChartProps) => {
  const { dailyEntries } = use(DataCacheContext)
  const filteredEntries = filterByTimeframe(dailyEntries, timeframe)

  return (
    <div className='bg-zinc-800 p-3 rounded-md space-y-3 w-auto'>
      <h4>Daily Word Count</h4>
      <div className='flex flex-row flex-wrap gap-3'>
        <Badge title="Maximum" style="primary">
          <span className='font-semibold text-white'>{_.maxBy(filteredEntries, 'count')?.count || 0}</span>
        </Badge>
        <Badge title="Average" style="secondary">
          <span className='font-semibold text-white'>{_.meanBy(filteredEntries, 'count').toFixed(1)}</span>
        </Badge>
        <Badge title="Minimum" style="subtle">
          <span className='font-semibold text-white'>{_.minBy(filteredEntries, 'count')?.count || 0}</span>
        </Badge>
      </div>
    </div>
  )
}

export default DailyWordCountStats