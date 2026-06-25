/**
 * Non-referential types, alphabetical
 */

export type ContainerProps = {
  className?: string;
};

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

export type FandomTotal = {
  fandom: string;
  count: number;
};

export type Fic = {
  id?: number;
  name: string;
  fandom: string;
  ship: string | null;
};

export type Timeframe = {
  label: string;
  firstWritten: string;
  lastWritten: string;
};

export type MonthContextValue = {
  month: number | null;
  setMonth: (newMonth: number | null) => void;
  filteredEntries: WordCountEntry[];
  filteredDailyTotals: DailyTotal[];
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

export type RunningTotal = {
  date: string;
  running_total: number;
};

export type TimelineData = {
  label: string;
  range: [number, number][];
};

export type WordCountEntry = {
  id?: number;
  date: string;
  fic: string;
  fandom: string;
  ship: string | null;
  ficId?: number | null;
  count: number;
};

export type YearContextValue = {
  year: number | null;
  setYear: (newYear: number | null) => void;
  availableYears: (number | null)[];
  refreshYears: () => void;
};

/**
 * Referential types
 */

export type DataCache = {
  dailyEntries: WordCountEntry[];
  dailyTotals: DailyTotal[];
  fandoms: string[];
  fandomTimelines: Timeframe[];
  fics: Fic[];
  ficTimelines: Timeframe[];
  runningTotal: RunningTotal[];
  refreshData: (year: number) => void;
};
