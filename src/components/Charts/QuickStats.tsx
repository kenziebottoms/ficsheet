import { use } from 'react'
import _ from 'lodash'

import { filterByTimeframe } from './utils'

import Badge from '../Badge'

import { DataCacheContext } from '../../contexts/DataCache/DataCacheContext'

const QuickStats = () => {
  const { dailyEntries, timeframe } = use(DataCacheContext)

  return (
    <>
      <h3>Quick Stats</h3>

      <div className='flex flex-row flex-wrap gap-3'>
        <Badge title="Max. Daily Word Count" style="primary">
          <span className='font-semibold text-white'>{_.maxBy(filterByTimeframe(dailyEntries, timeframe), 'count')?.count || 0}</span> words
        </Badge>
        <Badge title="Avg. Daily Word Count" style="secondary">
          <span className='font-semibold text-white'>{_.meanBy(filterByTimeframe(dailyEntries, timeframe), 'count').toFixed(1)}</span> words
        </Badge>
        <Badge title="Min. Daily Word Count" style="subtle">
          <span className='font-semibold text-white'>{_.minBy(filterByTimeframe(dailyEntries, timeframe), 'count')?.count || 0}</span> words
        </Badge>
      </div>
    </>
  )
}

export default QuickStats