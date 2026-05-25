import { createContext } from "react";

import type { YearContextValue } from "@/types";

export const YearContext = createContext<YearContextValue>({
  year: new Date().getFullYear(),
  setYear: () => { },
  availableYears: [null, new Date().getFullYear()],
})