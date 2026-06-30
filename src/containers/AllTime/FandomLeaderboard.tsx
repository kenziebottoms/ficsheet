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
  const topFandoms = _.orderBy(fandoms, 'totalWordsWritten').reverse().slice(0, 10)

  return <Widget title={`Top ${topFandoms.length} Fandoms`} className='space-y-2'>
    <Table
      headers={['Fandom', `Words Written Since ${years[years.length - 1]}`, 'Years Active']}
      data={topFandoms.map(fandom => ([
        <div className='py-1'>{fandom.name}</div>,
        <div className='py-1'>{fandom.totalWordsWritten.toLocaleString('en-US')}</div>,
        <div className='py-1'>
          {fandom.firstWritten.slice(0, 4)}
          {fandom.firstWritten.slice(0, 4) === fandom.lastWritten.slice(0, 4) ? '' : `-'${fandom.lastWritten.slice(2, 4)}`}
        </div>,
      ]))}
    />
  </Widget>
}

export default FandomLeaderboard