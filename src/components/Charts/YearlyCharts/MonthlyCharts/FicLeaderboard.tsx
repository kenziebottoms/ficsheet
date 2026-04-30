import _ from 'lodash'
import Table from "@/components/Table"
import { filterByYearAndMonth } from "../utils"
import { use } from "react"
import { YearContext } from "@/contexts/Year/YearContext"
import { MonthContext } from "@/contexts/Month/MonthContext"
import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext"

const FicLeaderboard = () => {
  const { dailyEntries } = use(DataCacheContext)
  const { year } = use(YearContext)
  const { month } = use(MonthContext)

  const entries = filterByYearAndMonth(dailyEntries, year, month)

  const entriesByFic = _.groupBy(entries, 'fic')
  const ficTotals = _.orderBy(_.map(entriesByFic, (entries, fic) => ([
    fic,
    _.find(entries, { fic })?.fandom,
    _.sumBy(entries, 'count')
  ])), '[2]').reverse().slice(0, 5)

  return <>
    <h3>Top {ficTotals.length} Fics</h3>
    <Table
      headers={['Fic', 'Fandom', 'Words Added']}
      data={ficTotals}
    />
  </>
}

export default FicLeaderboard