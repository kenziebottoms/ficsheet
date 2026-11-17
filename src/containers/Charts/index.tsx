import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import Spinner from "@/components/Spinner";
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
  const navigate = useNavigate()

  useEffect(() => {
    if (!year) {
      navigate(`/${new Date().getFullYear()}`)
    }
  }, [year])

  if (year == null) return <Spinner />

  return (
    <DataCacheProvider year={parseInt(year, 10)}>
      <div className={`flex flex-col gap-3 w-full ${className} ${ButtonBackgroundClassNames.secondary} pt-1`}>
        <YearlyCharts />
      </div>
    </DataCacheProvider>
  )
}

export default Charts