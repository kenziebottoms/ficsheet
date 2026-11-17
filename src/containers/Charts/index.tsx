import { useParams } from "react-router";

import { ButtonBackgroundClassNames } from "@/components/constants";

import { DataCacheProvider } from "@/contexts/DataCache/DataCacheProvider";

import YearlyCharts from "./YearlyCharts";

type Props = {
  className?: string;
}
const Charts = ({
  className = ''
}: Props) => {
  const { year } = useParams();
  return (
    <DataCacheProvider year={year ? parseInt(year, 10) : new Date().getFullYear()}>
      <div className={`flex flex-col gap-3 w-full ${className} ${ButtonBackgroundClassNames.secondary} pt-1`}>
        <YearlyCharts />
      </div>
    </DataCacheProvider>
  )
}

export default Charts