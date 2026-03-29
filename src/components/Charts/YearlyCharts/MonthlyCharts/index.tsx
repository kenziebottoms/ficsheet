import { useState } from "react";

import Button from "@/components/Button";
import History from "@/components/History";

import DailyWordCountStats from "./DailyWordCountStats";
import DayOfWeekRadar from "./DayOfWeekRadar";
import FandomPie from './FandomPie';
import RunningTotalLine from "./RunningTotalLine";

const MonthlyCharts = () => {
  const [editMode, setEditMode] = useState<boolean>(false)

  return <>
    <Button
      style={editMode ? "primary" : "secondary"}
      onClick={() => setEditMode(!editMode)}
      className='self-end'
    >
      Edit
    </Button>
    {editMode ? <History /> : <>
      <div className="flex flex-row flex-wrap justify-between gap-3">
        <DailyWordCountStats />
      </div>
      <div className="flex flex-row flex-wrap gap-3">
        <FandomPie />
        <RunningTotalLine />
        <DayOfWeekRadar />
      </div>
    </>}
  </>
}

export default MonthlyCharts