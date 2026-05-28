import { createContext } from "react";

import type { MonthContextValue } from "@/types";

export const MonthContext = createContext<MonthContextValue>({
  month: null,
  setMonth: () => { },
  filteredEntries: []
})