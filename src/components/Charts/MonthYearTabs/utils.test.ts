import { suite, expect, test } from "vitest";

import { filterByYearAndMonth } from "./utils";

const testItems = [
  { date: "2025-09-15" },
  { date: "2025-10-16" },
  { date: "2025-10-19" },
  { date: "2026-01-26" },
  { date: "2026-02-11" },
];

suite("filterByYearAndMonth", () => {
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
