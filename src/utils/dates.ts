import {
  addDays,
  addMonths,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  parse,
} from "date-fns";

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

/**
 * @param min The first date
 * @param max The last date
 * @returns A monthly array of date strings in the format `yyyy-MM`
 * starting with `min` and ending with `max`
 */
export const getMonthsBetween = (min: Date, max: Date): string[] => {
  const dates = [];
  let iterDate = new Date(min.getTime());
  iterDate.setDate(1);
  while (isBefore(iterDate, max) || isSameMonth(iterDate, max)) {
    dates.push(format(iterDate, "yyyy-MM"));
    iterDate = addMonths(iterDate, 1);
  }
  return dates;
};

export const reformatDate = (
  dateString: string,
  originalFormat: string,
  newFormat: string,
): string => {
  const date = parse(dateString, originalFormat, new Date());
  return format(date, newFormat);
};
