import {
  addDays,
  addMonths,
  endOfMonth,
  endOfYear,
  format,
  isAfter,
  isBefore,
  isFuture,
  isSameDay,
  isSameMonth,
  parse,
} from "date-fns";

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

/**
 * Filter a list for itmes whose dates fall within a given year or month.
 * @param items A list of objects with a { date: 'YYYY-MM-DD' } property
 * @param year The year
 * @param month The 0-indexed month index or null (null returns dates in the entire year)
 * @param filterFuture Whether to filter out objects whose dates are in the device's local future.
 * @returns The items in the list whose date properties fall within the given year or month.
 */
export const filterByYearAndMonth = <T extends { date: string }>(
  items: T[],
  year: number,
  month?: number | null,
  filterFuture = false,
): T[] => {
  const startDate = new Date(year, month || 0, 1);
  const endDate = month == null ? endOfYear(startDate) : endOfMonth(startDate);
  return items.filter((item) => {
    const fnDate = parse(item.date, "yyyy-MM-dd", new Date());
    return (
      (!filterFuture || !isFuture(fnDate)) &&
      !isBefore(fnDate, startDate) &&
      !isAfter(fnDate, endDate)
    );
  });
};

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
