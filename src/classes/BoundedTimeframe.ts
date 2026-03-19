import { isSameDay, isSameMonth, isSameYear } from "date-fns";

import type { ButtonStyle } from "../components/constants";

export type TimeframePeriod = "yearly" | "monthly" | "multiyear";
export const PeriodButtonStyles: Record<TimeframePeriod, ButtonStyle> = {
  yearly: "primary",
  monthly: "secondary",
  multiyear: "subtle",
};

type BoundedTimeframeProps = {
  startDate: Date;
  endDate: Date;
  period?: TimeframePeriod;
};
export class BoundedTimeframe {
  readonly startDate: Date;
  readonly endDate: Date;
  readonly period: TimeframePeriod;

  constructor({ startDate, endDate, period }: BoundedTimeframeProps) {
    this.startDate = startDate;
    this.endDate = endDate;
    if (period) {
      this.period = period;
    } else {
      // guess time period if not supplied
      if (isSameYear(startDate, endDate)) {
        this.period = isSameMonth(startDate, endDate) ? "monthly" : "yearly";
      } else {
        this.period = "multiyear";
      }
    }
  }

  equals(timeframe: BoundedTimeframe) {
    return (
      isSameDay(timeframe.startDate, this.startDate) &&
      isSameDay(timeframe.endDate, this.endDate)
    );
  }
}
