import { use } from 'react'
import _ from 'lodash'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'
import { MonthContext } from '@/contexts/Month/MonthContext'
import { YearContext } from '@/contexts/Year/YearContext'

import Badge from '@/components/Badge'

import { filterByYearAndMonth } from '../utils'

import DailyWordCountScatterPlot from './DailyWordCountScatterPlot'

const DailyWordCountStats = () => {
  const { dailyTotals } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  if (year == null) return null;

  const filteredTotals = filterByYearAndMonth(dailyTotals, year, month, true)

  return (
    <div className='bg-zinc-900 p-3 rounded-md space-y-3 w-auto flex flex-col items-start'>
      <DailyWordCountScatterPlot />
      <div className='flex flex-row flex-wrap gap-3'>
        <Badge title="Maximum" style="primary">
          <span className='font-semibold text-white'>{_.maxBy(filteredTotals, 'daily_total')?.daily_total || 0}</span> words
        </Badge>
        <Badge title="Average" style="secondary">
          <span className='font-semibold text-white'>{_.meanBy(filteredTotals, 'daily_total').toFixed(1)}</span> words
        </Badge>
        <Badge title="Minimum (excl. 0)" style="subtle">
          <span className='font-semibold text-white'>{_.min(_.without(_.map(filteredTotals, 'daily_total'), 0)) || 0}</span> words
        </Badge>
      </div>
    </div>
  )
}

export default DailyWordCountStats