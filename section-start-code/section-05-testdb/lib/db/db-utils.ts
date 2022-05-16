/* eslint-disable no-param-reassign */
// NOTE: in production this would connect to a database,
// not JSON files. However, I didn't want to make you install
// a particular database in order to use this app.
//
// This "database" is horribly inefficient and will be a problem
// when Popular Concert Venue has more than five people attending their shows.
import jsonPatch, { Operation } from "fast-json-patch";
import { promises as fs } from "fs";
import path from "path";

import type { Band } from "@/lib/features/bands/types";
import type { Reservation } from "@/lib/features/reservations/types";
import type { ShowWithoutAvailableSeatCount } from "@/lib/features/shows/types";
import type { AuthUser } from "@/lib/features/users/types";

import { getDbPath } from "./constants";

type JsonDataType =
  | AuthUser
  | Band
  | ShowWithoutAvailableSeatCount
  | Reservation;

export enum filenames {
  users = "users.json",
  bands = "bands.json",
  shows = "shows.json",
  reservations = "reservations.json",
}

const defaultDbPath = getDbPath();

export async function getJSONfromFile<ItemType extends JsonDataType>(
  filename: filenames,
  dbPath: string = defaultDbPath
): Promise<ItemType[]> {
  const filePath = path.join(dbPath, filename);
  const data = await fs.readFile(filePath);
  return JSON.parse(data.toString());
}

export async function getItemById<ItemType extends JsonDataType>(
  itemId: number,
  filename: filenames,
  itemType: string
): Promise<ItemType> {
  const items = await getJSONfromFile<ItemType>(filename);
  const itemData = items.filter((u: ItemType) => u.id === itemId);
  if (itemData.length < 1) throw new Error(`${itemType} not found`);
  if (itemData.length > 1) throw new Error(`duplicate ${itemType} found`);
  return itemData[0];
}

export async function writeJSONToFile<T extends JsonDataType>(
  filename: filenames,
  data: Array<T>,
  dbPath: string = defaultDbPath
): Promise<void> {
  const filePath = path.join(dbPath, filename);
  const jsonData = JSON.stringify(data);
  await fs.writeFile(filePath, jsonData, { flag: "w" });
}

export async function deleteItem<T extends JsonDataType>(
  filename: filenames,
  itemId: number
): Promise<number> {
  try {
    const items = await getJSONfromFile<T>(filename);
    const foundItemArray = items.filter((i) => i.id === itemId);
    if (foundItemArray.length !== 1) {
      throw new Error(`Could not find item id ${itemId} in ${filename}`);
    }
    const updatedItems = items.filter((i) => i.id !== itemId);
    await writeJSONToFile(filename, updatedItems);
    return itemId;
  } catch (e) {
    throw new Error(
      `Could not delete item id ${itemId} from ${filename}: ${e}`
    );
  }
}

/* ****** Update item ***** */
const { applyPatch } = jsonPatch;
// eslint-disable-next-line max-lines-per-function
export async function updateItem<DataType extends JsonDataType>(
  itemId: number,
  filename: filenames,
  // should be fast-json-patch Operation, but I can't destructure on import
  itemPatch: Operation[]
): Promise<DataType> {
  try {
    const items = await getJSONfromFile<DataType>(filename);

    // find the item
    const foundItems = items.filter((item) => item.id === itemId);
    if (foundItems.length !== 1) {
      throw new Error(`Could not find item with id ${itemId}`);
    }

    // apply the patch
    const updatedData = applyPatch(foundItems[0], itemPatch).newDocument;

    // write the new item data. Note: this whole function is horribly inefficient and
    // would be much improved with a real db.
    items.forEach((item, i) => {
      if (item.id === itemId) {
        items[i] = updatedData;
      }
    });

    await writeJSONToFile(filename, items);
    return updatedData;
  } catch (e) {
    throw new Error(
      `Could not delete item id ${itemId} from ${filename}: ${e}`
    );
  }
}
