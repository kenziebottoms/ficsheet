import { use, useState } from 'react'
import _ from 'lodash'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'

import Table from '@/components/Table'

import { MonthContext } from '@/contexts/Month/MonthContext'

const headers = ["Title", "Fandom", "Ship", "Words Added"]
// TODO: BUG: sorting by count
const headerSortProperties = ["fic", "fandom", "ship", "-count"];

const FicManager = () => {
  const { filteredEntries } = use(MonthContext)

  const [sortPropertyIndex, setSortPropertyIndex] = useState<number>(0)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const entriesByFic = _.groupBy(filteredEntries, 'fic')
  // TODO: => SQL
  const ficTotals = _.map(entriesByFic, (entries, fic) => {
    const entry = _.find(entries, { fic });
    return {
      ...entry,
      fic,
      count: _.sumBy(entries, 'count')
    }
  })

  const data = _.orderBy(ficTotals, headerSortProperties[sortPropertyIndex]).map((ft) => ([
    ft.fic,
    ft.fandom,
    ft.ship,
    ft.count
  ]))

  if (sortDir === 'asc') {
    data.reverse()
  }

  const handleHeaderClick = (headerIndex: number) => {
    if (headerIndex === sortPropertyIndex) {
      setSortDir(oldSortDir => oldSortDir === 'asc' ? 'desc' : "asc")
    } else {
      setSortPropertyIndex(headerIndex)
    }
  }

  return <Table
    headers={headers.map((header, headerIndex) => sortPropertyIndex === headerIndex ?
      <button className='cursor-pointer w-full text-left' type="button">
        {header} {sortDir === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />}
      </button> :
      header)}
    onHeaderClick={handleHeaderClick}
    data={data}
  />
}

export default FicManager