import { useEffect, useState, useTransition, type ReactNode } from 'react'

import { selectAllWordCounts } from '@/api'

import Table from '@/components/Table'
import Spinner from '@/components/Spinner'

const RecentEntries = () => {
  const [isPending, startTransition] = useTransition()

  const [data, setData] = useState<ReactNode[][]>([])

  useEffect(() => {
    startTransition(async () => {
      const response = await selectAllWordCounts(null, 'word_count.id', "DESC");
      setData(response.slice(0, 100).map(response => ([
        response.id,
        response.date,
        response.count,
        `${response.fic} (${response.fandom})`,
      ])));
    })
  }, [])

  if (isPending) return <Spinner />

  return <div className='p-2'>
    <h3>Recent Entries</h3>
    <Table
      headers={['id', 'date', 'count', 'fic']}
      data={data}
    />
  </div>
}

export default RecentEntries