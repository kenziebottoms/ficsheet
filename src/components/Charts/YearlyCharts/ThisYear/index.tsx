import { use, useState } from "react";

import Button from "@/components/Button";
import DailyProjectWordCountForm from "@/components/DailyProjectWordCountForm";
import Modal from "@/components/Modal";

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";

import DaysPastGauge from "./DaysPastGauge"

type Props = {
  className?: string;
}
const ThisYear = ({
  className = ''
}: Props) => {
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false)
  const { refreshData } = use(DataCacheContext)

  return <div className={["flex flex-row items-start justify-between gap-2", className].join(" ")}>
    <DaysPastGauge />

    <Button
      onClick={() => setShowEntryForm(!showEntryForm)}
      style='primary'
    >
      Log
    </Button>

    <Modal open={showEntryForm} setOpen={setShowEntryForm}>
      <DailyProjectWordCountForm
        className='bg-zinc-800'
        onCompleted={() => {
          setShowEntryForm(false)
          refreshData(new Date().getFullYear())
        }}
      />
    </Modal>
  </div>
}

export default ThisYear