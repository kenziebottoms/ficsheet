import { suite, expect, test } from "vitest";

import { getMedian } from "./utils";

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
