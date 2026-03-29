import { YearProvider } from "../../contexts/Year/YearProvider";

import MonthYearTabs from "./MonthYearTabs";

type Props = {
  className?: string;
}
const Charts = ({
  className = ''
}: Props) => {
  return (
    <div className={["p-3 flex flex-col gap-3", className].join(" ")}>
      <YearProvider>
        <MonthYearTabs />
      </YearProvider>
    </div >
  )
}

export default Charts