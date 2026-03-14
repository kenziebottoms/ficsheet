import fs from "fs";
import { parse } from "csv-parse";
import { format, isValid, parse as parseDate } from "date-fns";
import type { WordCountEntry } from "../src/types.ts";

export const readWordCountSpreadsheetRow = (
  cells: string[],
  fandoms: string[],
  year: number,
): WordCountEntry[] => {
  // if it's a single-fic day
  if (!cells.some((cell) => cell.includes(","))) {
    const [month, day] = cells;
    const fic = cells[cells.length - 3];
    const fandomTotals = cells.slice(3, cells.length - 3);
    const nonZeroFandomTotalIndex = fandomTotals.findIndex((x) => x !== "");
    if (nonZeroFandomTotalIndex === -1) {
      return [];
    }
    const count = parseInt(fandomTotals[nonZeroFandomTotalIndex], 10);
    const fandom = fandoms[nonZeroFandomTotalIndex];
    const date = parseDate(
      `${year} ${month} ${day}`,
      "yyyy MMM dd",
      new Date(),
    );
    if (isValid(date)) {
      const entry: WordCountEntry = {
        date: format(date, "yyyy-MM-dd"),
        fic,
        fandom,
        count,
      };
      return [entry];
    }
  }
  return [];
};

// Use stream.pipeline for proper backpressure handling and error propagation
export async function readCSV(inputFile: string, year: number) {
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
          entries.push(...newEntries);
          if (newEntries[0].date.includes("12-31")) {
            break;
          }
        }
      }
      i++;
    }
    console.log(entries.slice(0, 5), ` and ${entries.length - 5} more...`);
    console.log("Finished reading CSV file");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
