import { parse } from "date-fns";

import type { MonthYearTimeframe } from "./types";

export const filterByTimeframe = <T extends { date: string }>(
  items: T[],
  timeframe: MonthYearTimeframe,
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

/**
 * Add the Epoch timestamp as a new property `timestamp`
 * @param datedObject any object with a date property in the format 'yyyy-MM-dd'
 * @returns the datedObject with an added Epoch timestamp
 */
export const addTimestamp = <T extends { date: string }>(datedObject: T) => {
  return {
    ...datedObject,
    timestamp: parse(datedObject.date, "yyyy-MM-dd", new Date()).getTime(),
  };
};
