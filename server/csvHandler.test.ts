import assert from "node:assert";
import { describe, it } from "node:test";

import { readWordCountSpreadsheetRow } from "./csvHandler.ts";

describe("readWordCountSpreadsheetRow", () => {
  const fandoms = [
    "Superman",
    "Game of Thrones",
    "Stranger Things",
    "Fandom #4",
    "Fandom #5",
    "Fandom #6",
    "Fandom #7",
    "Other",
    "Non-fiction",
  ];
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
          "coffee shop au 3",
          "27026",
          "",
        ],
        fandoms,
        2025,
      ),
      [
        {
          date: "2025-12-25",
          fic: "coffee shop au 3",
          fandom: "Superman",
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
          "coffee shop au 3",
          "27026",
          "",
        ],
        fandoms,
        2025,
      ),
      [
        {
          date: "2025-06-26",
          fic: "coffee shop au 3",
          fandom: "Superman",
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
          "coffee shop au 3, pacific rim au",
          "25049",
          "",
        ],
        fandoms,
        2025,
      ),
      [
        {
          date: "2025-10-29",
          fic: "coffee shop au 3",
          fandom: "Superman",
          count: 31,
        },
        {
          date: "2025-10-29",
          fic: "pacific rim au",
          fandom: "Game of Thrones",
          count: 24,
        },
      ],
    );
  });
  it("3rd fandom", () => {
    assert.deepEqual(
      readWordCountSpreadsheetRow(
        [
          "Dec",
          "31",
          "5",
          "",
          "",
          "5",
          "",
          "",
          "",
          "",
          "",
          "",
          "vampire eddie",
          "27227",
          "",
        ],
        fandoms,
        2025,
      ),
      [
        {
          count: 5,
          date: "2025-12-31",
          fandom: "Stranger Things",
          fic: "vampire eddie",
        },
      ],
    );
  });
  it("2 fics, 1 fandom", () => {
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
          "coffee shop au 2 & coffee shop au 3",
          "27026",
          "",
        ],
        fandoms,
        2025,
      ),
      [
        {
          date: "2025-12-25",
          fic: "coffee shop au 2",
          fandom: "Superman",
          count: 142,
        },
        {
          date: "2025-12-25",
          fic: "coffee shop au 3",
          fandom: "Superman",
          count: 1,
        },
      ],
    );
  });
  it("3 fics, 1 fandom", () => {
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
          "coffee shop au 1 & coffee shop au 2 & coffee shop au 3",
          "27026",
          "",
        ],
        fandoms,
        2025,
      ),
      [
        {
          date: "2025-12-25",
          fic: "coffee shop au 1",
          fandom: "Superman",
          count: 141,
        },
        {
          date: "2025-12-25",
          fic: "coffee shop au 2",
          fandom: "Superman",
          count: 1,
        },
        {
          date: "2025-12-25",
          fic: "coffee shop au 3",
          fandom: "Superman",
          count: 1,
        },
      ],
    );
  });
});
