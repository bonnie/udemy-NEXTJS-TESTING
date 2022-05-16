import {
  filenames,
  getItemById,
  getJSONfromFile,
  writeJSONToFile,
} from "@/lib/db/db-utils";

import type { Band } from "./types";

export async function writeBands(newBandsArray: Band[]): Promise<void> {
  await writeJSONToFile(filenames.bands, newBandsArray);
}

export async function getBands(): Promise<Band[]> {
  return getJSONfromFile<Band>(filenames.bands);
}

export async function getBandById(bandId: number): Promise<Band> {
  return getItemById<Band>(bandId, filenames.bands, "band");
}

export async function addBand(newBand: Band): Promise<Band> {
  const bands = await getBands();
  bands.push(newBand);
  await writeBands(bands);
  return newBand;
}
