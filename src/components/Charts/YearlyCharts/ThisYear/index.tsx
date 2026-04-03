import { use, useState } from "react";

import Button from "@/components/Button";
import DailyProjectWordCountForm from "@/components/DailyProjectWordCountForm";
import Modal from "@/components/Modal";

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";

import ProjectedAnnualWordCount from "./ProjectedAnnualWordCount";

type Props = {
  className?: string;
}
const ThisYear = ({
  className = ''
}: Props) => {
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false)
  const { refreshData, runningTotal } = use(DataCacheContext)

  return <div className={["flex flex-row items-center justify-start gap-2", className].join(" ")}>
    {runningTotal.length > 0 && <ProjectedAnnualWordCount className="grow" />}

    <Button
      onClick={() => setShowEntryForm(!showEntryForm)}
      style='primary'
      className="self-start"
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