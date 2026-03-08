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

export type WordCountEntry = {
  date: string;
  fic: string;
  fandom: string;
  count: number;
};

export type DataCache = {
  dailyEntries: WordCountEntry[];
  runningTotal: RunningTotal[];
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
};
