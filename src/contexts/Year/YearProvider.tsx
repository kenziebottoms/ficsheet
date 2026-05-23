import { useEffect, useState, type PropsWithChildren } from "react";
import { Insights } from "@mui/icons-material";

import { selectAvailableYears } from "@/api";

import Button from "@/components/Button";
import { ButtonBackgroundClassNames } from "@/components/constants";

import { DataCacheProvider } from "@/contexts/DataCache/DataCacheProvider";

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
        <div className="flex flex-row items-end gap-2 pl-2 mt-2">
          <h3 className='px-3 text-xs m-1 flex flex-row items-center gap-2'>
            <Insights />
            <div>
              <span className='text-primary-medium'>fic</span>sheet
            </div>
          </h3>
          <div className="flex flex-row items-center gap-2 overflow-x-auto">
            {availableYears.map(y => <Button
              key={y}
              style={year === y ? 'primary' : 'subtle'}
              className={["transition-all duration-100 capitalize", y === year ? 'rounded-b-none mt-2' : 'mb-2'].join(" ")}
              onClick={() => setYear(y)}
            >
              {y}
            </Button>)}
          </div>
        </div>
        <div className={[
          ButtonBackgroundClassNames.primary,
          year === availableYears[0] ? 'rounded-tl-none' : '',
          "-mt-3 rounded-xl p-3 space-y-3"
        ].join(' ')}>
          {children}
        </div>
      </DataCacheProvider>
    </YearContext>
  );
}
