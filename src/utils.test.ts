import { suite, expect, test } from "vitest";

import { countWords, getMedian, largeNumberFormatter } from "./utils";

suite("countWords", () => {
  test.for([
    [null, 0],
    [undefined, 0],
    [" ", 0],
    ["", 0],
    ["one", 1],
    ["one two", 2],
    ["trailing space ", 2],
    [" leading space", 2],
    ["double  space", 2],
    ["tab\tseparated", 2],
    ["hypen-ated", 1],
    ["with a 1/2 date stamp in the middle", 7],
    ["with a 12/2 date stamp in the middle", 7],
    ["with a 1/24 date stamp in the middle", 7],
    ["with a 12/27 date stamp in the middle", 7],
  ] as [string, number][])("countWords(%s): %i", ([input, expectedOutput]) => {
    expect(countWords(input)).toEqual(expectedOutput);
  });
});

suite("getMedian", () => {
  test.for([
    [[9, 4, 7, 1], 5.5],
    [[5, 3, 1, 8, 90], 5],
    [[1, 2, 3], 2],
    [[10, 8, 6], 8],
  ] as [number[], number][])(
    "getMedian[(%s], %i)",
    ([input, expectedOutput]) => {
      expect(getMedian(input)).toEqual(expectedOutput);
    },
  );
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
  ])("%i => %s", ([input, expectedOutput]) => {
    expect(largeNumberFormatter(input)).toEqual(expectedOutput);
  });
});
