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

export type DailyWordCountRawFormValues = {
  id?: string;
  date: string;
  fic?: string;
  ficId?: string;
  fandom?: string;
  ship?: string;
  pastedWords?: string;
  count?: string;
};
export type DailyWordCountFormValues = {
  id: number | null;
  date: string;
  fic: string | null;
  ficId: number | null;
  fandom: string | null;
  ship: string | null;
  count: number;
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

export type DropdownOption<T> = {
  value: T;
  label: string;
};

export type Fandom = {
  name: string;
  firstWritten: string;
  lastWritten: string;
  totalWordsWritten: number;
};

export type Fic = {
  id: number | undefined;
  name: string;
  fandom: string;
  ship: string | null;
  firstWritten: string;
  lastWritten: string;
};

export type MonthContextValue = {
  month: number | null;
  setMonth: (newMonth: number | null) => void;
  filteredEntries: WithId<WordCountEntry>[];
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

export type Ship = {
  name: string;
  fandom: string;
  firstWritten: string;
  lastWritten: string;
  totalWordsWritten: number;
};

export type TimelineData = {
  label: string;
  range: [number, number][];
};

export type WithId<T> = T & {
  id: number;
};

export type WordCountEntry = {
  id?: number;
  date: string;
  fic?: string;
  fandom?: string;
  ship?: string | null;
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
  fandoms: Fandom[];
  fics: WithId<Fic>[];
  runningTotal: RunningTotal[];
  refreshData: (year: number) => void;
};
