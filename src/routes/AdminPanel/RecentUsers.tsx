import { useEffect, useState, useTransition } from 'react'

import { selectUsers } from '@/api'

import Table from '@/components/Table'
import Spinner from '@/components/Spinner'

import type { User, WithId } from '@/types'

const RecentUsers = () => {
  const [isPending, startTransition] = useTransition()

  const [data, setData] = useState<WithId<User>[]>()

  useEffect(() => {
    startTransition(async () => {
      const response = await selectUsers();
      setData(response.slice(0, 50));
    })
  }, [])

  if (isPending) return <Spinner />

  return <div className='p-2'>
    <h3>Recent Users</h3>
    <Table
      headers={['id', 'username', 'email']}
      data={(data || []).map(u => ([u.id, u.username, u.email]))}
    />
  </div>
}

export default RecentUsers