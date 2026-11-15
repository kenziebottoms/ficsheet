import { useEffect, useState, useTransition, type ReactNode } from 'react'

import { selectGoals } from '@/api'

import Table from '@/components/Table'
import Spinner from '@/components/Spinner'

const RecentGoals = () => {
  const [isPending, startTransition] = useTransition()

  const [data, setData] = useState<ReactNode[][]>([])

  useEffect(() => {
    startTransition(async () => {
      const response = await selectGoals(null, 'goal.id', "DESC");
      setData(response.slice(0, 50).map(response => ([
        response.id,
        response.name,
        response.targetWordCount,
        response.startDate,
        response.endDate,
        response.fic,
        response.fandom,
        response.ship
      ])));
    })
  }, [])

  if (isPending) return <Spinner />

  return <div className='p-2'>
    <h3>Recent Goals</h3>
    <Table
      headers={['id', 'name', 'targetWordCount', 'startDate', 'endDate', 'fic', 'fandom', 'ship']}
      data={data}
    />
  </div>
}

export default RecentGoals