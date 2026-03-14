import assert from "node:assert";
import { describe, it } from "node:test";

import { readWordCountSpreadsheetRow } from "./csvHandler.ts";

describe("processHeaders", () => {});

const fandoms = [
  "Mad Max",
  "Inception",
  "Stranger Things",
  "Fandom #4",
  "Fandom #5",
  "Fandom #6",
  "Fandom #7",
  "Other",
  "Non-fiction",
];

describe("readWordCountSpreadsheetRow", () => {
  it("1 fic", () => {
    assert.deepEqual(
      readWordCountSpreadsheetRow(
        [
          "Dec",
          "25",
          "143",
          "143",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "muzzled max 3",
          "27026",
          "",
        ],
        fandoms,
        2025,
      ),
      [
        {
          date: "2025-12-25",
          fic: "muzzled max 3",
          fandom: "Mad Max",
          count: 143,
        },
      ],
    );
  });
  it("1 fic in June", () => {
    assert.deepEqual(
      readWordCountSpreadsheetRow(
        [
          "June",
          "26",
          "30",
          "30",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "muzzled max 3",
          "27026",
          "",
        ],
        fandoms,
        2025,
      ),
      [
        {
          date: "2025-06-26",
          fic: "muzzled max 3",
          fandom: "Mad Max",
          count: 30,
        },
      ],
    );
  });
  it("2 fics", () => {
    assert.deepEqual(
      readWordCountSpreadsheetRow(
        [
          "Oct",
          "29",
          "55",
          "31",
          "24",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "muzzled max 3, transception",
          "25049",
          "",
        ],
        fandoms,
        2025,
      ),
      [
        {
          date: "2025-10-29",
          fic: "muzzled max 3",
          fandom: "Mad Max",
          count: 31,
        },
        {
          date: "2025-10-29",
          fic: "transception",
          fandom: "Inception",
          count: 24,
        },
      ],
    );
  });
});
