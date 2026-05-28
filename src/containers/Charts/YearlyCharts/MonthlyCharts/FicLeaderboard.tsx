import { use } from "react"
import _ from 'lodash'

import Table from "@/components/Table"

import { MonthContext } from "@/contexts/Month/MonthContext"

const FicLeaderboard = () => {
  const { filteredEntries } = use(MonthContext)

  const entriesByFic = _.groupBy(filteredEntries, 'fic')
  // TODO: => SQL
  const ficTotals = _.orderBy(_.map(entriesByFic, (entries, fic) => ([
    fic,
    _.find(entries, { fic })?.fandom,
    _.sumBy(entries, 'count')
  ])), '[2]').reverse().slice(0, 5)

  return <>
    <h3>Top {ficTotals.length} Fics</h3>
    <Table
      headers={['Fic', 'Fandom', 'Words Added']}
      data={ficTotals.map(row => row.map(cell => <div className='py-1'>{cell}</div>))}
    />
  </>
}

export default FicLeaderboard