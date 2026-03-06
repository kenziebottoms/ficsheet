import type { MonthName } from "./types";

export const getMonthName = (date: Date) =>
  date.toLocaleString("default", { month: "long" }) as MonthName;
