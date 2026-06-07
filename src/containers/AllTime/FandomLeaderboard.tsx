import _ from 'lodash'

import Table from "@/components/Table"
import Widget from "@/components/Widget"

import type { FandomTotal } from "@/types"

const FandomLeaderboard = ({
  fandomTotals,
  years,
}: {
  fandomTotals: FandomTotal[];
  years: number[];
}) => {
  const topFandoms = _.orderBy(fandomTotals, 'count').reverse().slice(0, 5)

  return <Widget title={`Top ${topFandoms.length} Fandoms`} className='space-y-2'>
    <Table
      headers={['Fandom', `Words Written Since ${years[years.length - 1]}`]}
      data={topFandoms.map(ft => ([
        <div className='py-1'>{ft.fandom}</div>,
        <div className='py-1'>{ft.count.toLocaleString('en-US')}</div>
      ]))}
    />
  </Widget>
}

export default FandomLeaderboard