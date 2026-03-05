import { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts'
import _ from 'lodash'

import type { DailyWordCountEntry } from '../../types'
import { selectAllWordCounts } from '../../api'

const FandomPie = () => {
  const [dailyEntries, setDailyEntries] = useState<DailyWordCountEntry[]>([])

  useEffect(() => {
    selectAllWordCounts().then(setDailyEntries)
  }, [])

  const colors = [
    '#4f46e5', '#fb923c', '#f6339a'
  ]
  const fandoms = Object.keys(_.countBy(dailyEntries, 'fandom')).sort()
  const data = fandoms.map((fandom, i) => ({
    id: i,
    label: fandom,
    value: _.sumBy(_.filter(dailyEntries, { fandom }), 'count'),
    color: colors[i % 3]
  }))

  return <div className='rounded-lg border-2 border-dashed border-zinc-700 p-3'>
    <h3 className='mb-2'>Word Count By Fandom</h3>
    <PieChart
      series={[{ data }]}
      width={200}
      height={200}
      slotProps={{
        legend: {
          sx: {
            color: '#d4d4d8',
          },
        },
      }}
    />
  </div>
}

export default FandomPie