import { Link } from "react-router"
import { RoundaboutLeft } from "@mui/icons-material"

import Button from '@/components/Button'

import RecentEntries from "./RecentEntries"

const AdminPanel = () => {

  return <div>
    <Link to="/">
      <Button
        style="primary"
        icon={RoundaboutLeft}
      >
        Back to app
      </Button>
    </Link>
    <RecentEntries />
  </div>
}

export default AdminPanel