import { use } from 'react'
import _ from 'lodash'

import { DataCacheContext } from '../../../contexts/DataCache/DataCacheContext'

import Badge from '../../Badge'

import { filterByTimeframe } from './utils'
import type { MonthYearChartProps } from './types'

const QuickStats = ({
  timeframe
}: MonthYearChartProps) => {
  const { dailyEntries } = use(DataCacheContext)
  const filteredEntries = filterByTimeframe(dailyEntries, timeframe)

  return (
    <div className='flex flex-row flex-wrap gap-3 bg-zinc-800 p-3 rounded-md'>
      <Badge title="Max. Daily Word Count" style="primary">
        <span className='font-semibold text-white'>{_.maxBy(filteredEntries, 'count')?.count || 0}</span> words
      </Badge>
      <Badge title="Avg. Daily Word Count" style="secondary">
        <span className='font-semibold text-white'>{_.meanBy(filteredEntries, 'count').toFixed(1)}</span> words
      </Badge>
      <Badge title="Min. Daily Word Count" style="subtle">
        <span className='font-semibold text-white'>{_.minBy(filteredEntries, 'count')?.count || 0}</span> words
      </Badge>
    </div>
  )
}

export default QuickStats