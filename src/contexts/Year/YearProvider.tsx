import { useEffect, useState, type PropsWithChildren } from "react";

import { selectAvailableYears } from "../../api";

import { DataCacheProvider } from "../DataCache/DataCacheProvider";

import { YearContext } from "./YearContext";

type Props = PropsWithChildren & {
  initialValue?: number;
}
export const YearProvider = ({ initialValue, children }: Props) => {
  const [year, setYear] = useState<number>(initialValue || new Date().getFullYear())
  const [availableYears, setAvailableYears] = useState<number[]>([year])

  useEffect(() => {
    selectAvailableYears().then(setAvailableYears)
  }, [])

  return (
    <YearContext value={{
      year,
      setYear,
      availableYears,
    }}>
      <DataCacheProvider year={year}>
        {children}
      </DataCacheProvider>
    </YearContext>
  );
}
