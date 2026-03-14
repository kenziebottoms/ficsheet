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
});
