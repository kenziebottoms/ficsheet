import _ from 'lodash'

import Table from "@/components/Table"
import Widget from "@/components/Widget"

import type { Ship } from "@/types"

const ShipLeaderboard = ({
  ships,
}: {
  ships: Ship[];
}) => {
  const topShips = _.orderBy(ships, 'totalWordsWritten').reverse().slice(0, 10)

  return <Widget title={`Top ${topShips.length} Ships`} className='space-y-2 w-full'>
    <Table
      headers={['Ship', 'Fandom', 'Words Written', 'Years Active']}
      data={topShips.map(ship => ([
        <div className='py-1'>{ship.name}</div>,
        <div className='py-1'>{ship.fandom}</div>,
        <div className='py-1'>{ship.totalWordsWritten.toLocaleString('en-US')}</div>,
        <div className='py-1'>
          {ship.firstWritten.slice(0, 4)}
          {ship.firstWritten.slice(0, 4) === ship.lastWritten.slice(0, 4) ? '' : `-'${ship.lastWritten.slice(2, 4)}`}
        </div>,
      ]))}
    />
  </Widget>
}

export default ShipLeaderboard