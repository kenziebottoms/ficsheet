import { use, useEffect, useState } from "react";
import { AutoDelete, AutoMode, ContentPasteGoOutlined, Delete } from "@mui/icons-material";

import { deleteEntriesByYear, exportData, importFicsForYear } from "@/api";

import { DataCacheContext } from "@/contexts/DataCache/DataCacheContext";
import { YearContext } from "@/contexts/Year/YearContext";

import Button from "@/components/Button";
import EntryForm from "@/components/EntryForm";
import Modal from "@/components/Modal";
import Toggle from "@/components/Toggle";

import type { WordCountEntry } from "@/types";

import { copyPrettyJson } from '@/utils';

import EntryList from "./EntryList";

const Journal = () => {
  const { year } = use(YearContext)
  const { refreshData } = use(DataCacheContext)

  const [editedEntry, setEditedEntry] = useState<Partial<WordCountEntry> | null>(null)
  const [showEmpty, setShowEmpty] = useState<boolean>(false)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

  // must click delete button twice within 5 seconds to delete
  useEffect(() => {
    if (confirmDelete) {
      setTimeout(() => {
        setConfirmDelete(false)
      }, 5000)
    }
  }, [confirmDelete])

  if (year == null) return null;

  const handleExport = () => {
    exportData(year).then(copyPrettyJson)
  }

  const handleDelete = () => {
    deleteEntriesByYear(year).then(() => refreshData(year))
  }

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
    <div className='space-y-2'>
      <div className='bg-zinc-900 p-2 rounded-md flex flex-row flex-wrap justify-end gap-4'>
        <Button
          style="cautionary"
          icon={confirmDelete ? AutoDelete : Delete}
          onClick={() => confirmDelete ? handleDelete() : setConfirmDelete(true)}
          small
        >
          {confirmDelete && <em>Please</em>} Delete {year}
        </Button>

        <Button
          style="cautionary"
          icon={AutoMode}
          onClick={() => importFicsForYear(year).then(() => refreshData(year))}
          small
        >
          Import Fics
        </Button>

        <div className='grow' />

        <Button
          style="transparent"
          icon={ContentPasteGoOutlined}
          onClick={handleExport}
          small
        >
          Export to Clipboard
        </Button>

        <Toggle
          label="Show empty"
          value={showEmpty}
          onChange={setShowEmpty}
          className="text-sm"
        />
      </div>
      <div className="overflow-auto w-full">
        <EntryList
          showEmpty={showEmpty}
          setEditedEntry={setEditedEntry}
        />
      </div>
    </div>
  </>
}

export default Journal