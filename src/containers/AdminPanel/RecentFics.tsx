import { useEffect, useState, useTransition, type ReactNode } from 'react'

import { selectFics } from '@/api'

import Table from '@/components/Table'
import Spinner from '@/components/Spinner'

const RecentFics = () => {
  const [isPending, startTransition] = useTransition()

  const [data, setData] = useState<ReactNode[][]>([])

  useEffect(() => {
    startTransition(async () => {
      const response = await selectFics(null, 'fic.id', 'DESC');
      setData(response.slice(0, 50).map(response => ([
        response.id,
        response.name,
        response.ship,
        response.fandom,
      ])));
    })
  }, [])

  if (isPending) return <Spinner />

  return <div className='p-2'>
    <h3>Recent Fics</h3>
    <Table
      headers={['id', 'name', 'ship', 'fandom']}
      data={data}
    />
  </div>
}

export default RecentFics