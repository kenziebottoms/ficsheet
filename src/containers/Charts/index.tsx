import { YearProvider } from "@/contexts/Year/YearProvider";

import YearlyCharts from "./YearlyCharts";

type Props = {
  className?: string;
}
const Charts = ({
  className = ''
}: Props) => {
  return (
    <div className={["flex flex-col gap-3 w-full", className].join(" ")}>
      <YearProvider>
        <YearlyCharts />
      </YearProvider>
    </div>
  )
}

export default Charts