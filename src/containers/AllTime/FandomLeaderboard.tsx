import _ from 'lodash'

import Table from "@/components/Table"
import Widget from "@/components/Widget"

import type { Fandom } from "@/types"

const FandomLeaderboard = ({
  fandoms,
  years,
}: {
  fandoms: Fandom[];
  years: number[];
}) => {
  const topFandoms = _.orderBy(fandoms, 'totalWordsWritten').reverse().slice(0, 5)

  return <Widget title={`Top ${topFandoms.length} Fandoms`} className='space-y-2'>
    <Table
      headers={['Fandom', `Words Written Since ${years[years.length - 1]}`]}
      data={topFandoms.map(fandom => ([
        <div className='py-1'>{fandom.name}</div>,
        <div className='py-1'>{fandom.totalWordsWritten.toLocaleString('en-US')}</div>
      ]))}
    />
  </Widget>
}

export default FandomLeaderboard