import { useState } from "react"
import { Link } from "react-router"
import { RoundaboutLeft } from "@mui/icons-material"

import Button from '@/components/Button'

import RecentEntries from "./RecentEntries"
import RecentFics from "./RecentFics"
import RecentGoals from "./RecentGoals"

const AdminPanel = () => {
  const [activeTable, setActiveTable] = useState('word_count')

  return <div className="bg-orange-800 p-2 space-y-2">
    <div className="rounded-xl bg-zinc-900 p-2 flex flex-row items-center gap-2">
      <span className="opacity-75">Inspect table:</span>
      {[
        'fic',
        'goal',
        'word_count',
      ].map(table => <Button
        key={table}
        small
        style={activeTable === table ? 'secondary' : 'subtle'}
        onClick={() => setActiveTable(table)}
      >
        {table}
      </Button>)}
      <div className="grow" />
      <Link to="/">
        <Button
          style="primary"
          icon={RoundaboutLeft}
        >
          Back to app
        </Button>
      </Link>
    </div>
    <div className="bg-zinc-800 rounded-lg overflow-x-auto">
      {activeTable === 'word_count' && <RecentEntries />}
      {activeTable === 'fic' && <RecentFics />}
      {activeTable === 'goal' && <RecentGoals />}
    </div>
  </div>
}

export default AdminPanel