import { use, useEffect, useState, type PropsWithChildren } from "react";
import { isFuture } from "date-fns";

import Button from "@/components/Button";
import { ButtonBackgroundClassNames } from "@/components/constants";

import { MonthNames } from "@/types";

import { YearContext } from "@/contexts/Year/YearContext";

import { MonthContext } from "./MonthContext";

type Props = PropsWithChildren & {
  initialValue?: number | null;
}
export const MonthProvider = ({ initialValue, children }: Props) => {
  const { year } = use(YearContext)
  const thisYear = new Date().getFullYear()

  // month=null means select the entire year
  const [month, setMonth] = useState<number | null>(initialValue ?? null)

  // if changing years to a future month
  useEffect(() => {
    if (year === thisYear && month != null && isFuture(new Date(thisYear, month, 1))) {
      // view YTD
      setMonth(null)
    }
  }, [year])

  return (
    <div>
      <MonthContext value={{
        month,
        setMonth,
      }}>
        <div className='flex flex-row gap-2 mt-3'>
          <Button
            style={month == null ? 'primary' : 'subtle'}
            onClick={() => setMonth(null)}
            className={['whitespace-nowrap transition-all', month == null ? 'rounded-b-none mt-2' : 'mb-2'].join(' ')}
          >
            {year === thisYear ? 'YTD' : "Overall"}
          </Button>
          {MonthNames
            // (to date if current year)
            .slice(0, year === thisYear ? (new Date().getMonth() + 1) : 12)
            .map((monthName, m) => <Button
              key={m}
              style={month === m ? 'secondary' : 'subtle'}
              className={[
                "transition-all duration-100 capitalize",
                m === month ? 'rounded-b-none mt-2' : 'mb-2'
              ].join(" ")}
              onClick={() => setMonth(m)}
              small
            >
              {monthName.slice(0, 3)}
            </Button>)}
          <div className='grow' />
        </div>
        <div className={[
          'rounded-md p-3 flex flex-col gap-3',
          month == null ? 'rounded-tl-none' : '',
          ButtonBackgroundClassNames[month === null ? 'primary' : 'secondary']
        ].join(' ')}>
          {children}
        </div>
      </MonthContext>
    </div>
  );
}
