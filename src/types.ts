export type DailyWordCountEntry = {
  date: string;
  fic: string;
  fandom: string;
  count: number;
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
