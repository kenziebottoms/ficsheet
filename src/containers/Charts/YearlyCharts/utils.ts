import {
  endOfMonth,
  endOfYear,
  isAfter,
  isBefore,
  isFuture,
  parse,
} from "date-fns";

export const filterByYearAndMonth = <T extends { date: string }>(
  items: T[],
  year: number,
  month?: number | null,
  filterFuture = false,
) => {
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
 * @returns the largest number of `items` in a row that satisfy the condition `evaluator(item)`
 */
export const getLongestStreak = <T>(
  items: T[],
  evaluator: (item: T) => boolean,
): number => {
  let highestStreak = 0;
  let streak = 0;
  items.forEach((item) => {
    if (evaluator(item)) {
      streak++;
    } else {
      if (streak > highestStreak) {
        highestStreak = streak;
      }
      streak = 0;
    }
  });
  return highestStreak || streak;
};
