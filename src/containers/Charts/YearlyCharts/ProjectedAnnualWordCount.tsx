import { use, useState } from 'react'
import { getDayOfYear, isLeapYear } from 'date-fns'
import { Gauge } from '@mui/x-charts'
import { EditCalendar } from '@mui/icons-material'

import Badge from '@/components/Badge'
import Button from '@/components/Button'
import DailyProjectWordCountForm from '@/components/DailyProjectWordCountForm'
import Modal from '@/components/Modal'
import Widget from '@/components/Widget'
import { ButtonBackgroundClassNames } from '@/components/constants'

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext'

import type { ContainerProps } from '@/types'

const ProjectedAnnualWordCount = ({
  className = ''
}: ContainerProps) => {
  const { runningTotal, refreshData } = use(DataCacheContext)
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false)

  if (runningTotal.length === 0) {
    return null
  }

  const { running_total } = runningTotal[runningTotal.length - 1]
  const year = new Date().getFullYear()
  const daysInYear = isLeapYear(year) ? 366 : 365
  const daysPast = getDayOfYear(new Date())

  const hr = <div className='border border-dotted border-zinc-500 h-4 md:h-0 w-0 md:w-4 grow-[0.35]' />

  return <>
    <Modal open={showEntryForm} setOpen={setShowEntryForm}>
      <DailyProjectWordCountForm
        className='bg-zinc-800'
        onCompleted={() => {
          setShowEntryForm(false)
          refreshData(new Date().getFullYear())
        }}
      />
    </Modal>

    <div className={['p-2 w-full flex flex-col md:flex-row flex-wrap justify-center items-center md:gap-y-3', className].join(" ")}>
      <div className={[
        ButtonBackgroundClassNames.secondary,
        'bg-primary h-8 w-8 rounded-full shrink-0 grow-0'
      ].join(" ")} />

      {hr}

      <Widget title="Days past" className='items-center'>
        <Gauge
          width={100}
          height={100}
          valueMin={0}
          valueMax={daysInYear}
          value={daysPast}
          className='mx-auto'
        />
      </Widget>

      {hr}

      <Badge style="secondary" title="Total Words Written">
        {running_total.toLocaleString("en-US")}
      </Badge>

      {hr}

      <Badge style="subtle">
        <div className='text-sm text-center text-foreground mb-2'>Write {Math.ceil(running_total / daysPast).toLocaleString("en-US")} words to<br />to stay on track!</div>
        <Button
          onClick={() => setShowEntryForm(!showEntryForm)}
          style='primary'
          className='mx-auto'
          icon={EditCalendar}
        >
          Log
        </Button>
      </Badge>

      {hr}

      <Badge style="primary" title={(<>Projected Annual<br />Word Count</>)}>
        {Math.round(running_total * (daysInYear / daysPast)).toLocaleString("en-US")}
      </Badge>
    </div>
  </>
}

export default ProjectedAnnualWordCount