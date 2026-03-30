import { addDays, format, isBefore, isSameDay } from "date-fns";

/**
 * @param min The first date
 * @param max The last date
 * @returns A daily array of date strings in the format `yyyy-MM-dd`
 * starting with `min` and ending with `max`
 */
export const getDatesBetween = (min: Date, max: Date): string[] => {
  const dates = [];
  let iterDate = new Date(min.getTime());
  while (isBefore(iterDate, max) || isSameDay(iterDate, max)) {
    dates.push(format(iterDate, "yyyy-MM-dd"));
    iterDate = addDays(iterDate, 1);
  }
  return dates;
};
