import { useState } from "react"
import { Link } from "react-router"
import { RoundaboutLeft } from "@mui/icons-material"

import Button from '@/components/Button'

import RecentEntries from "./RecentEntries"
import RecentFics from "./RecentFics"

const AdminPanel = () => {
  const [activeTable, setActiveTable] = useState('word_count')

  return <div className="bg-zinc-800 p-2">
    <div className="rounded-xl bg-zinc-900 p-2 flex flex-row gap-2">
      <Link to="/">
        <Button
          style="primary"
          icon={RoundaboutLeft}
        >
          Back to app
        </Button>
      </Link>
      {['word_count', 'fic'].map(table => <Button
        style={activeTable === table ? 'secondary' : 'subtle'}
        onClick={() => setActiveTable(table)}
      >
        {table}
      </Button>)}
    </div>
    {activeTable === 'word_count' && <RecentEntries />}
    {activeTable === 'fic' && <RecentFics />}
  </div >
}

export default AdminPanel