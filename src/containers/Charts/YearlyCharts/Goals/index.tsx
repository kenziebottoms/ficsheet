import { use, useState } from 'react'
import { OutlinedFlag } from '@mui/icons-material'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'
import { YearContext } from '@/contexts/Year/YearContext'

import Button from '@/components/Button'
import GoalForm from '@/components/GoalForm'
import Modal from '@/components/Modal'

import type { Goal, WithId } from '@/types'

import GoalTracker from './GoalTracker'

const Goals = () => {
  const { year } = use(YearContext)
  const { goals, refreshData } = use(DataCacheContext)
  const [goalFormValues, setGoalFormValues] = useState<Partial<WithId<Goal>> | null>(null)

  if (year == null || !goals) return null;

  return <div className='space-y-2'>
    <div className='bg-zinc-900 p-2 rounded-md flex flex-row justify-end gap-4'>
      <Button
        style="transparent"
        icon={OutlinedFlag}
        onClick={() => setGoalFormValues({})}
        small
      >
        Add Goal
      </Button>
    </div>

    <div className='flex flex-col gap-2 bg-zinc-800 rounded-md p-2'>
      {goals.map(goal => <GoalTracker
        key={goal.id}
        goal={goal}
        onEdit={() => setGoalFormValues(goal)}
      />)}

      <Modal
        open={goalFormValues != null}
        setOpen={(newOpen: boolean) => !newOpen && setGoalFormValues(null)}
      >
        <GoalForm
          className='bg-zinc-800'
          values={goalFormValues}
          onCompleted={() => {
            setGoalFormValues(null)
            refreshData()
          }}
        />
      </Modal>
    </div>
  </div>
}

export default Goals