import { useEffect, useState, type PropsWithChildren } from "react";

import { selectAvailableYears } from "../../api";
import Button from "../../components/Button";
import { ButtonBackgroundClassNames } from "../../components/constants";

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
        <div className="flex flex-row gap-2">
          {availableYears.map(y => <Button
            key={y}
            style={year === y ? 'primary' : 'subtle'}
            className={["transition-all duration-100 capitalize", y === year ? 'rounded-b-none mt-2' : 'mb-2'].join(" ")}
            onClick={() => setYear(y)}
          >
            {y}
          </Button>)}
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
