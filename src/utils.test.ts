import { suite, expect, test } from "vitest";

import { getMedian, largeNumberFormatter } from "./utils";

suite("getMedian", () => {
  test.for([
    [[9, 4, 7, 1], 5.5],
    [[5, 3, 1, 8, 90], 5],
    [[1, 2, 3], 2],
    [[10, 8, 6], 8],
  ] as [number[], number][])("getMedian(%i, %i)", ([input, expectedOutput]) => {
    expect(getMedian(input)).toEqual(expectedOutput);
  });
});

suite("largeNumberFormatter", () => {
  test.for([
    ["0", "0"],
    ["1", "1"],
    ["293", "293"],
    ["926", "926"],
    ["4629", "4.6k"],
    ["9000", "9k"],
    ["10039", "10k"],
    ["23603", "23.6k"],
    ["693289", "693.3k"],
  ])("%i, %i", ([input, expectedOutput]) => {
    expect(largeNumberFormatter(input)).toEqual(expectedOutput);
  });
});
