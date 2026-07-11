import { use } from 'react'
import _ from 'lodash'

import Badge from '@/components/Badge'

import { MonthContext } from '@/contexts/Month/MonthContext'

import DailyWordCountScatterPlot from './DailyWordCountScatterPlot'

const DailyWordCountStats = () => {
  const { filteredDailyTotals } = use(MonthContext)

  return (
    <div className='bg-zinc-900 p-2 rounded-md w-auto flex flex-row flex-wrap gap-2 grow'>
      <DailyWordCountScatterPlot className="grow" />
      <div className='flex flex-col sm:flex-row lg:flex-col flex-wrap gap-2 grow'>
        <Badge title="Maximum" style="primary" className='grow'>
          <div>
            <span className='font-semibold text-white text-2xl'>{(_.maxBy(filteredDailyTotals, 'daily_total')?.daily_total || 0).toLocaleString("en-US")}</span>
            <span className='text-sm'> words</span>
          </div>
        </Badge>
        <Badge title="Average" style="secondary" className='grow'>
          <div>
            <span className='font-semibold text-white text-2xl'>{_.meanBy(filteredDailyTotals, 'daily_total').toLocaleString("en-US", { maximumSignificantDigits: 1 })}</span>
            <span className='text-sm'> words</span>
          </div>
        </Badge>
        <Badge title={`Minimum\n(excl. 0)`} style="subtle" className='grow whitespace-pre-line'>
          <div>
            <span className='font-semibold text-white text-2xl'>{(_.min(_.without(_.map(filteredDailyTotals, 'daily_total'), 0)) || 0).toLocaleString("en-US")}</span>
            <span className='text-sm'> words</span>
          </div>
        </Badge>
      </div>
    </div>
  )
}

export default DailyWordCountStats