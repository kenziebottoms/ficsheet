import { promises as fsPromises } from "fs";
import _ from "lodash";

import { insertEntry } from "./db/queries.ts";

export async function readJson(inputFile: string, updateDb = false) {
  console.log(`reading JSON '${inputFile}'`);
  const data = await fsPromises.readFile(inputFile);

  const entries = JSON.parse(`${data}`);
  if (updateDb) {
    entries.forEach(insertEntry);
  }
  console.log("Finished reading JSON file");
  return entries;
}
