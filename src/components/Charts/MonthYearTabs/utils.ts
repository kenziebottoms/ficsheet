import { isAfter, isBefore, parse } from "date-fns";

import type { BoundedTimeframe } from "../../../classes/BoundedTimeframe";

export const filterByTimeframe = <T extends { date: string }>(
  items: T[],
  timeframe: BoundedTimeframe,
) => {
  return items.filter((item) => {
    const fnDate = parse(item.date, "yyyy-MM-dd", new Date());
    const notBeforeTimeframe = !isBefore(fnDate, timeframe.startDate);
    const notAfterTimeframe = !isAfter(fnDate, timeframe.endDate);
    return notBeforeTimeframe && notAfterTimeframe;
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
