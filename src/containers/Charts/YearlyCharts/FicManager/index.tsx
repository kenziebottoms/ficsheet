import { use } from 'react'
import _ from 'lodash'

import Table from '@/components/Table'

import { MonthContext } from '@/contexts/Month/MonthContext'

const FicManager = () => {
  const { filteredEntries } = use(MonthContext)

  const ficEntries = _.orderBy(_.uniqBy(filteredEntries, 'fic'), 'fic');

  return <Table
    headers={["Title", "Fandom", "Ship"]}
    data={ficEntries.map(fic => ([fic.fic, fic.fandom, fic.ship]))}
  />
}

export default FicManager