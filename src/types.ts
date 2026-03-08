/**
 * Non-referential types, alphabetical
 */

export type DailyTotal = {
  date: string;
  daily_total: number;
};

export const MonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
export type MonthName = (typeof MonthNames)[number];

export type RunningTotal = {
  date: string;
  running_total: number;
};

/** Year or month index */
export type Timeframe = number;

export type WordCountEntry = {
  date: string;
  fic: string;
  fandom: string;
  count: number;
};

/**
 * Referential types
 */

export type DataCache = {
  dailyEntries: WordCountEntry[];
  dailyTotals: DailyTotal[];
  runningTotal: RunningTotal[];
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
};
