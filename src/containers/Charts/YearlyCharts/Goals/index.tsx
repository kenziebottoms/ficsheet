import { use, useEffect, useState } from 'react'
import { EditCalendar, OutlinedFlag } from '@mui/icons-material'
import { isPast, parse } from 'date-fns'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'
import { YearContext } from '@/contexts/Year/YearContext'

import Button from '@/components/Button'
import GoalForm from '@/components/GoalForm'
import EntryForm from '@/components/EntryForm'
import Modal from '@/components/Modal'
import Toggle from '@/components/Toggle'

import type { Goal, WithId, WordCountEntry } from '@/types'

import { sleep } from '@/utils'

import GoalTracker from './GoalTracker'

const Goals = () => {
  const { year } = use(YearContext)
  const { goals, refreshData } = use(DataCacheContext)
  const [goalFormValues, setGoalFormValues] = useState<Partial<WithId<Goal>> | null>(null)
  const [entryFormValues, setEntryFormValues] = useState<Partial<WithId<WordCountEntry>> | null>(null)
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [showEntryForm, setShowEntryForm] = useState(false)
  const [hideCompleted, setHideCompleted] = useState(true)
  const [hidePast, setHidePast] = useState(year === new Date().getFullYear())

  useEffect(() => {
    if (goalFormValues != null) {
      setShowGoalForm(true)
    }
  }, [goalFormValues])
  useEffect(() => {
    if (entryFormValues != null) {
      setShowEntryForm(true)
    }
  }, [entryFormValues])

  if (year == null || !goals) return null;

  const filteredGoals = goals
    .filter(goal => !hideCompleted || goal.targetWordCount > goal.totalWordsWritten)
    .filter(goal => !hidePast || goal.endDate == null || !isPast(parse(goal.endDate, 'yyyy-MM-dd', new Date())))

  return <div className='space-y-2'>
    <div className='bg-zinc-900 p-2 rounded-md flex flex-row justify-between gap-4'>
      <div />
      <div className='flex flex-row gap-4'>
        <Toggle
          label="Hide completed"
          value={hideCompleted}
          onChange={setHideCompleted}
          className="text-sm"
        />
        <Toggle
          label="Hide ended"
          value={hidePast}
          onChange={setHidePast}
          className="text-sm"
        />
      </div>

      <div className='flex flex-row gap-2'>
        <Button
          style="transparent"
          icon={EditCalendar}
          onClick={() => setEntryFormValues({})}
          small
        >
          Log Word Count
        </Button>
        <Button
          style="transparent"
          icon={OutlinedFlag}
          onClick={() => setGoalFormValues({})}
          small
        >
          Add Goal
        </Button>
      </div>
    </div>

    <div className='flex flex-col gap-2 bg-zinc-800 rounded-md p-2'>
      {filteredGoals.map(goal => <GoalTracker
        key={goal.id}
        goal={goal}
        setGoalFormValues={setGoalFormValues}
        setEntryFormValues={setEntryFormValues}
      />)}

      <Modal
        open={showGoalForm}
        setOpen={setShowGoalForm}
      >
        <GoalForm
          className='bg-zinc-800'
          values={goalFormValues}
          onCompleted={async () => {
            setShowGoalForm(false)
            await sleep(100)
            setGoalFormValues(null)
            refreshData()
          }}
        />
      </Modal>

      <Modal
        open={showEntryForm}
        setOpen={setShowEntryForm}
      >
        <EntryForm
          className='bg-zinc-800'
          values={entryFormValues}
          onCompleted={async () => {
            setShowEntryForm(false)
            await sleep(100)
            setEntryFormValues(null)
            refreshData()
          }}
        />
      </Modal>
    </div>
  </div>
}

export default Goals