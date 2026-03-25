import { useState, type PropsWithChildren } from "react";

import { MonthContext } from "./MonthContext";

type Props = PropsWithChildren & {
  initialValue?: number;
}
export const MonthProvider = ({ initialValue, children }: Props) => {
  // a value of null means select the entire year
  const [month, setMonth] = useState<number | null>(initialValue ?? null)

  return (
    <MonthContext value={{
      month,
      setMonth,
    }}>
      {children}
    </MonthContext>
  );
}
