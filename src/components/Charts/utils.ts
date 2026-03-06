import { parse } from "date-fns";

/** Year or month index */
export type Timeframe = number;

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
