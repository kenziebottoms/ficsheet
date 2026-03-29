import { YearProvider } from "../../contexts/Year/YearProvider";

import YearlyCharts from "./YearlyCharts";

type Props = {
  className?: string;
}
const Charts = ({
  className = ''
}: Props) => {
  return (
    <div className={["p-3 flex flex-col gap-3", className].join(" ")}>
      <YearProvider>
        <YearlyCharts />
      </YearProvider>
    </div >
  )
}

export default Charts