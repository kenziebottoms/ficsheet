import { useEffect, useState, type PropsWithChildren } from "react";
import { Insights } from "@mui/icons-material";

import { selectAvailableYears } from "@/api";

import Button from "@/components/Button";
import { ButtonBackgroundClassNames } from "@/components/constants";

import AllTime from "@/containers/AllTime";

import { DataCacheProvider } from "@/contexts/DataCache/DataCacheProvider";

import { YearContext } from "./YearContext";

type Props = PropsWithChildren & {
  initialValue?: number;
}
export const YearProvider = ({ initialValue, children }: Props) => {
  // year = null means "All Time"
  const [year, setYear] = useState<number | null>(initialValue || new Date().getFullYear())
  const [availableYears, setAvailableYears] = useState<(number | null)[]>(year == null ? [null] : [null, year])

  const refreshYears = () => selectAvailableYears().then(years => setAvailableYears([null, ...years]))

  useEffect(() => {
    refreshYears()
  }, [])

  return (
    <YearContext value={{
      year,
      setYear,
      availableYears,
      refreshYears,
    }}>
      <div className="w-full flex flex-col md:flex-row items-center gap-2 pt-2">
        <h3 className='text-xs md:mb-2 md:px-3 flex flex-row items-center gap-2'>
          <Insights htmlColor="#9f9fa9" />
          <div>
            <span className='text-primary-medium'>fic</span>sheet
          </div>
        </h3>
        <div className="w-full flex flex-row items-center gap-2 overflow-x-auto px-2">
          {availableYears.map(y => <Button
            key={y}
            style={year === y ? (y == null ? 'primary' : 'secondary') : 'subtle'}
            className={`${y === year ? 'rounded-b-none py-2' : 'mb-2'} whitespace-nowrap transition-all duration-100 capitalize`}
            onClick={() => setYear(y)}
          >
            {y ?? 'All Time'}
          </Button>)}
        </div>
      </div>
      <div className={`${ButtonBackgroundClassNames[year == null ? 'primary' : 'secondary']} -mt-3 rounded-xl p-3 space-y-3`}>
        {year == null ?
          <AllTime /> :
          <DataCacheProvider year={year}>
            {children}
          </DataCacheProvider>}
      </div>
    </YearContext>
  );
}
