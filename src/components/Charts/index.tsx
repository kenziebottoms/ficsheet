import type { DailyWordCountEntry } from "../../types";
import FandomPie from "./FandomPie";

type Props = {
  className?: string;
  dailyEntries: DailyWordCountEntry[];
}
const Charts = ({
  dailyEntries,
  className = ''
}: Props) => {
  return <div className={["p-3 flex flex-col gap-3", className].join(" ")}>
    <h2>Charts</h2>
    <div className="flex flex-row flex-wrap gap-3">
      <FandomPie dailyEntries={dailyEntries} />
    </div>
  </div>
}

export default Charts