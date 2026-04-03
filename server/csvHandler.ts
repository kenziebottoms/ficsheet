import fs from "fs";
import _ from "lodash";
import { parse } from "csv-parse";
import { format, isValid, parse as parseDate } from "date-fns";

import type { WordCountEntry } from "../src/types.ts";

import { upsertEntry } from "./queries.ts";

export const readWordCountSpreadsheetRow = (
  cells: string[],
  fandoms: string[],
  year: number,
): WordCountEntry[] => {
  const [month, day] = cells;
  const dateString = `${year} ${month} ${day}`;
  const dateDate = parseDate(dateString, "yyyy MMMM dd", new Date());
  if (isValid(dateDate)) {
    const date = format(dateDate, "yyyy-MM-dd");
    const fandomTotals = cells.slice(3, cells.length - 3);
    const projects = cells[cells.length - 3];

    let entries: WordCountEntry[] = [];
    let nonEmptyFandomTotalIndex = 0;
    fandomTotals.forEach((fandomTotal, fandomTotalIndex) => {
      if (fandomTotal !== "") {
        if (projects.split(",")[nonEmptyFandomTotalIndex] === undefined) {
          throw new Error(
            `Entry for ${date} contains more word counts than fandoms.`,
          );
        }
        entries.push({
          fandom: fandoms[fandomTotalIndex].trim(),
          count: parseInt(fandomTotal, 10),
          fic: projects.split(",")[nonEmptyFandomTotalIndex].trim(),
          date,
        });
        nonEmptyFandomTotalIndex++;
      }
    });
    return entries;
  } else {
    console.log(`invalid date '${dateString}'`);
  }
  return [];
};

// Use stream.pipeline for proper backpressure handling and error propagation
export async function readCSV(
  inputFile: string,
  year: number,
  updateDb = false,
) {
  console.log(`reading CSV '${inputFile}' for ${year}`);
  const parser = fs.createReadStream(inputFile).pipe(parse());

  try {
    // Use async iterator pattern to process rows incrementally
    // This ensures proper backpressure handling and prevents memory build-up
    let i = 0;
    let fandoms;
    let entries: WordCountEntry[] = [];
    for await (const row of parser) {
      if (i === 0) {
        fandoms = row.slice(3, row.length - 3);
      } else {
        const newEntries = readWordCountSpreadsheetRow(row, fandoms, year);
        if (newEntries.length > 0) {
          if (updateDb) {
            newEntries.forEach(upsertEntry);
          }
          entries.push(...newEntries);
          if (newEntries[0].date.includes("12-31")) {
            break;
          }
        }
      }
      i++;
    }
    console.log("Finished reading CSV file");
    return entries;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
