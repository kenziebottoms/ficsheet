import { parse } from "date-fns";

import type { Timeframe } from "../../types";

export const filterByTimeframe = <T extends { date: string }>(
  items: T[],
  timeframe: Timeframe,
) => {
  return items.filter((item) => {
    const fnDate = parse(item.date, "yyyy-MM-dd", new Date());
    // if year
    if (timeframe > 100) {
      return fnDate.getFullYear() === timeframe;
    }
    // if month
    else {
      return fnDate.getMonth() === timeframe;
    }
  });
};
