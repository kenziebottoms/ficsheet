/**
 * Non-referential types, alphabetical
 */

export type DailyTotal = {
  date: string;
  daily_total: number;
};

export const DaysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;
export type DayOfWeek = (typeof DaysOfWeek)[number];

export type MonthContextValue = {
  month: number | null;
  setMonth: (newMonth: number | null) => void;
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

export type WordCountEntry = {
  date: string;
  fic: string;
  fandom: string;
  count: number;
};

export type YearContextValue = {
  year: number;
  setYear: (newYear: number) => void;
  availableYears: number[];
};

/**
 * Referential types
 */

export type DataCache = {
  dailyEntries: WordCountEntry[];
  dailyTotals: DailyTotal[];
  runningTotal: RunningTotal[];
  refreshData: (year?: number) => void;
};
