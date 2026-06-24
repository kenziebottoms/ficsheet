import { use } from 'react'
import _ from 'lodash'

import Badge from '@/components/Badge'

import { MonthContext } from '@/contexts/Month/MonthContext'

import DailyWordCountScatterPlot from './DailyWordCountScatterPlot'

const DailyWordCountStats = () => {
  const { filteredDailyTotals } = use(MonthContext)

  return (
    <div className='bg-zinc-900 p-3 rounded-md w-auto flex flex-row gap-3'>
      <DailyWordCountScatterPlot />
      <div className='flex flex-col gap-3'>
        <Badge title="Maximum" style="primary">
          <span className='font-semibold text-white'>{(_.maxBy(filteredDailyTotals, 'daily_total')?.daily_total || 0).toLocaleString("en-US")}</span> words
        </Badge>
        <Badge title="Average" style="secondary">
          <span className='font-semibold text-white'>{_.meanBy(filteredDailyTotals, 'daily_total').toLocaleString("en-US", { maximumSignificantDigits: 1 })}</span> words
        </Badge>
        <Badge title="Minimum (excl. 0)" style="subtle">
          <span className='font-semibold text-white'>{(_.min(_.without(_.map(filteredDailyTotals, 'daily_total'), 0)) || 0).toLocaleString("en-US")}</span> words
        </Badge>
      </div>
    </div>
  )
}

export default DailyWordCountStats