import { use, useState } from 'react'
import _ from 'lodash'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'

import Table from '@/components/Table'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'

const headerSortProperties = ["name", "fandom", "ship"];

const FicManager = () => {
  const { fics } = use(DataCacheContext)

  const [sortPropertyIndex, setSortPropertyIndex] = useState<number>(0)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const data = _.orderBy(fics, headerSortProperties[sortPropertyIndex]).map((ft) => ([
    ft.name,
    ft.fandom,
    ft.ship,
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
    headers={headerSortProperties.map((header, headerIndex) => <button className='cursor-pointer w-full text-left' type="button">
      {header}
      {sortPropertyIndex === headerIndex && <>{sortDir === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />}</>}
    </button>)}
    onHeaderClick={handleHeaderClick}
    data={data}
  />
}

export default FicManager