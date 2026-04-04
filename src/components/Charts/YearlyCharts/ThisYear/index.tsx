import { use, useState } from "react";
import { EditCalendar } from "@mui/icons-material";

import Button from "@/components/Button";
import DailyProjectWordCountForm from "@/components/DailyProjectWordCountForm";
import Modal from "@/components/Modal";

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";

import type { ContainerProps } from "@/types";

import ProjectedAnnualWordCount from "./ProjectedAnnualWordCount";

const ThisYear = ({
  className = ''
}: ContainerProps) => {
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false)
  const { refreshData, runningTotal } = use(DataCacheContext)

  return <div className={["flex flex-row items-center justify-between gap-2", className].join(" ")}>
    {runningTotal.length > 0 && <ProjectedAnnualWordCount />}

    <Button
      onClick={() => setShowEntryForm(!showEntryForm)}
      style='primary'
      className="self-start"
      icon={EditCalendar}
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