import { suite, expect, test } from "vitest";
import { parse } from "date-fns";

import {
  filterByYearAndMonth,
  getDatesBetween,
  getMonthsBetween,
} from "./dates";

suite("filterByYearAndMonth", () => {
  const testItems = [
    { date: "2025-09-15" },
    { date: "2025-10-16" },
    { date: "2025-10-19" },
    { date: "2026-01-26" },
    { date: "2026-02-11" },
  ];

  test("2025", () => {
    expect(filterByYearAndMonth(testItems, 2025)).toEqual(
      testItems.slice(0, 3),
    );
  });
  test("Oct 2025", () => {
    expect(filterByYearAndMonth(testItems, 2025, 9)).toEqual(
      testItems.slice(1, 3),
    );
  });
  test("2026", () => {
    expect(filterByYearAndMonth(testItems, 2026)).toEqual(testItems.slice(3));
  });
  test("Feb 2026", () => {
    expect(filterByYearAndMonth(testItems, 2026, 1)).toEqual(
      testItems.slice(4),
    );
  });
});

suite("getDatesBetween", () => {
  test("within one month", () => {
    expect(
      getDatesBetween(
        parse("2020-01-03", "yyyy-MM-dd", new Date()),
        parse("2020-01-07", "yyyy-MM-dd", new Date()),
      ),
    ).toEqual([
      "2020-01-03",
      "2020-01-04",
      "2020-01-05",
      "2020-01-06",
      "2020-01-07",
    ]);
  });
  test("across months", () => {
    expect(
      getDatesBetween(
        parse("2020-01-29", "yyyy-MM-dd", new Date()),
        parse("2020-02-03", "yyyy-MM-dd", new Date()),
      ),
    ).toEqual([
      "2020-01-29",
      "2020-01-30",
      "2020-01-31",
      "2020-02-01",
      "2020-02-02",
      "2020-02-03",
    ]);
  });
});

suite("getMonthsBetween", () => {
  test("within one month", () => {
    expect(
      getMonthsBetween(
        parse("2020-01-03", "yyyy-MM-dd", new Date()),
        parse("2020-01-07", "yyyy-MM-dd", new Date()),
      ),
    ).toEqual(["2020-01"]);
  });
  test("across months", () => {
    expect(
      getMonthsBetween(
        parse("2020-01-29", "yyyy-MM-dd", new Date()),
        parse("2020-02-03", "yyyy-MM-dd", new Date()),
      ),
    ).toEqual(["2020-01", "2020-02"]);
  });
  test("across years", () => {
    expect(
      getMonthsBetween(
        parse("2019-12-29", "yyyy-MM-dd", new Date()),
        parse("2020-02-03", "yyyy-MM-dd", new Date()),
      ),
    ).toEqual(["2019-12", "2020-01", "2020-02"]);
  });
});
