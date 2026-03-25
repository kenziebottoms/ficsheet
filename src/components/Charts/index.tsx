import { YearProvider } from "../../contexts/Year/YearProvider";

import MonthlyFandomBar from "./MonthlyFandomBar";
import MonthYearTabs from "./MonthYearTabs";

type Props = {
  className?: string;
}
const Charts = ({
  className = ''
}: Props) => {
  return (
    <div className={["p-3 flex flex-col gap-3", className].join(" ")}>
      <h2>Charts</h2>

      <MonthYearTabs />

      <h3 className="w-full my-2">This Year</h3>
      <div className="flex flex-row flex-wrap gap-3">
        <YearProvider>
          <MonthlyFandomBar />
        </YearProvider>
      </div>
    </div >
  )
}

export default Charts