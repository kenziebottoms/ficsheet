import { suite, expect, test } from "vitest";

import { filterByYearAndMonth, getLongestStreak } from "./utils";

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

suite("getLongestStreak", () => {
  test.for([
    [[true, false, true, false, true], 1],
    [[true, true, true, false, true], 3],
    [[true, true, true, true, true], 5],
    [[true, true, true, true, true, false], 5],
    [[false, false, false, false, false], 0],
  ] as [boolean[], number][])(
    "getLongestStreak(%i, %i)",
    ([input, expectedOutput]) => {
      expect(getLongestStreak(input, (x) => x)).toEqual(expectedOutput);
    },
  );
});
