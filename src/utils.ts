import { addDays, format, isBefore, isSameDay } from "date-fns";

export const countWords = (input?: string | null) => {
  if (!input || input === " ") {
    return 0;
  }
  const pastedWords = input
    // remove #(#)/#(#) date stamps
    .replace(/\b\d{1,2}\/\d{1,2}\b/, "")
    .trim();
  return pastedWords.split(/\s+/g).length;
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

export const getMedian = (data: number[]) => {
  const sortedData = data.slice().sort((a, b) => a - b);
  if (sortedData.length % 2 === 0) {
    return (
      (sortedData[sortedData.length / 2] +
        sortedData[sortedData.length / 2 - 1]) /
      2
    );
  } else {
    return sortedData[(sortedData.length - 1) / 2];
  }
};

export const largeNumberFormatter = (x: string) => {
  const number = parseInt(x, 10) ?? 0;
  return number >= 1000
    ? `${(number / 1000).toFixed(1).replace(".0", "")}k`
    : `${number}`;
};
