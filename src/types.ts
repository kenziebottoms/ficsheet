export type DailyWordCountEntry = {
  date: string;
  fic: string;
  fandom: string;
  count: number;
};

/** Year or month index */
export type Timeframe = number;

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

export type DataCache = {
  dailyEntries: DailyWordCountEntry[];
  runningTotal: RunningTotal[];
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
};
