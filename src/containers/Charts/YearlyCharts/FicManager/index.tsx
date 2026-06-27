import { use, useContext, useState } from 'react'
import _ from 'lodash'
import { ArrowDropDown, ArrowDropUp, Edit } from '@mui/icons-material'

import Button from '@/components/Button'
import FicForm from '@/components/FicForm'
import Modal from '@/components/Modal'
import Table from '@/components/Table'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'
import { MonthContext } from '@/contexts/Month/MonthContext'

import type { Fic } from '@/types'

const headerSortProperties = ["name", "fandom", "ship"];

const FicManager = () => {
  const { fics } = use(DataCacheContext)
  const { filteredEntries } = useContext(MonthContext)

  const [sortPropertyIndex, setSortPropertyIndex] = useState<number>(0)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [ficFormValues, setFicFormValues] = useState<Fic | null>(null)

  const filteredFicIds = _.uniq(_.map(filteredEntries, 'ficId')).filter(x => x != null)
  const filteredFics = filteredFicIds.map(id => _.find(fics, { id })).filter(x => x != null)

  const data = _.orderBy(filteredFics, headerSortProperties[sortPropertyIndex]).map((fic) => ([
    fic.name,
    fic.fandom,
    fic.ship,
    <Button
      style="transparent"
      icon={Edit}
      onClick={() => setFicFormValues(fic)}
      small
    />
  ]))

  if (sortDir === 'asc') {
    data.reverse()
  }

  const handleHeaderClick = (headerIndex: number) => {
    if (headerIndex < sortableHeaders.length) {
      if (headerIndex === sortPropertyIndex) {
        setSortDir(oldSortDir => oldSortDir === 'asc' ? 'desc' : "asc")
      } else {
        setSortPropertyIndex(headerIndex)
      }
    }
  }

  const sortableHeaders = ["name", "fandom", "ship"].map((headerSortProperty, headerIndex) => <button
    className='cursor-pointer w-full text-left'
    type="button"
    onClick={() => handleHeaderClick(headerIndex)}
  >
    {_.capitalize(headerSortProperty)}
    {sortPropertyIndex === headerIndex && <>{sortDir === 'asc' ? <ArrowDropUp /> : <ArrowDropDown />}</>}
  </button>)

  return <>
    <Modal open={ficFormValues != null} setOpen={() => setFicFormValues(null)}>
      <FicForm
        className='bg-zinc-800'
        values={ficFormValues}
        onCompleted={() => setFicFormValues(null)}
      />
    </Modal>
    <Table
      headers={[...sortableHeaders, null]}
      data={data}
    />
  </>
}

export default FicManager