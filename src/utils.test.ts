import { suite, expect, test } from "vitest";
import { parse } from "date-fns";

import {
  countWords,
  getDatesBetween,
  getMedian,
  largeNumberFormatter,
} from "./utils";

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
