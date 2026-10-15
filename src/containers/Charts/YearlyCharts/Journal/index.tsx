import { use, useState } from "react";

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";

import EntryForm from "@/components/EntryForm";
import Modal from "@/components/Modal";

import type { WordCountEntry } from "@/types";

import EntryList from "./EntryList";

type Props = {
  showEmpty: boolean;
}
const Journal = ({ showEmpty }: Props) => {
  const { refreshData } = use(DataCacheContext)

  const [editedEntry, setEditedEntry] = useState<Partial<WordCountEntry> | null>(null)

  return <>
    {editedEntry != null && <Modal
      open
      setOpen={(newOpen: boolean) => {
        if (!newOpen) {
          setEditedEntry(null)
        }
      }}
    >
      <EntryForm
        className='bg-zinc-800'
        values={editedEntry}
        onCompleted={() => {
          setEditedEntry(null)
          refreshData()
        }}
      />
    </Modal>}
    <div className="overflow-auto w-full">
      <EntryList
        showEmpty={showEmpty}
        setEditedEntry={setEditedEntry}
      />
    </div>
  </>
}

export default Journal