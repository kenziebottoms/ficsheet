import { addDays, format } from "date-fns";

import type { MonthName } from "./types";

export const getMonthName = (date: Date) =>
  date.toLocaleString("default", { month: "long" }) as MonthName;

export const getDatesBetween = (min: Date, max: Date) => {
  const dates = [];
  let iterDate = new Date(min.getTime());
  while (iterDate.getTime() < max.getTime()) {
    dates.push(format(iterDate, "yyyy-MM-dd"));
    iterDate = addDays(iterDate, 1);
  }
  return dates;
};
