/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */

import dayjs from "dayjs";

import { getBands, writeBands } from "@/lib/features/bands/queries";
import type { Band, Image } from "@/lib/features/bands/types";
import { addReservation } from "@/lib/features/reservations/queries";
import { writeShows } from "@/lib/features/shows/queries";
import type { ShowWithoutAvailableSeatCount } from "@/lib/features/shows/types";

import { venueCapacity } from "../constants";
import {
  adjectives,
  bandImages,
  bandNames,
  conjunctions,
  genres,
  nouns,
} from "./bandData";

function getUnique<ItemType>(
  items: Array<ItemType>,
  itemType: string,
  containerType: string
): ItemType {
  // find a random item and swap it with the last item for popping
  const randomIndex = Math.floor(Math.random() * items.length);
  const lastIndex = items.length - 1;
  [items[randomIndex], items[lastIndex]] = [
    items[lastIndex],
    items[randomIndex],
  ];

  // pop the random item from the end
  const item = items.pop();
  if (!item) throw new Error(`ran out of ${itemType} for ${containerType}`);

  return item;
}

function getRandom(words: Array<string>) {
  return words[Math.floor(Math.random() * words.length)];
}

const getArticle = (adj: string, noun: string) => {
  if (noun[noun.length - 1] === "s") return "";
  if (["a", "e", "i", "o", "u"].includes(adj[0])) return "an";
  return "a";
};

export const makeDescription = (): string => {
  const genre = getRandom(genres);
  const noun = getUnique(nouns, "nouns", "descriptions");
  const adj1 = getUnique(adjectives, "adjectives", "descriptions");
  const adj2 = getUnique(adjectives, "adjectives", "descriptions");
  const conjunction = getRandom(conjunctions);

  const article = getArticle(adj2, noun);

  return `${adj1} ${genre}${conjunction} ${article} ${adj2} ${noun}`;
};

function generateBand(id: number, name: string, image: Image): Band {
  const description = makeDescription();
  return { id, name, description, image };
}

async function generateBands() {
  console.log("\t\tGenerating bands...");
  const bands = await getBands();
  const newBands: Array<Band> = [];
  while (newBands.length + bands.length < 14) {
    const name = getUnique(bandNames, "band name", "bands");
    const image = getUnique(bandImages, "band images", "bands");

    const id = Math.floor(Math.random() * 100000);
    const band = generateBand(id, name, image);
    newBands.push(band);
  }

  await writeBands(newBands);
  return bands.concat(newBands);
}

function getRandomPurchasedSeatCount() {
  return Math.floor(Math.random() * venueCapacity);
}

async function generateavailableSeatCount(showId: number): Promise<void> {
  const purchasedSeatCount = getRandomPurchasedSeatCount();
  await addReservation({
    id: Math.floor(Math.random() * 10000000),
    showId,
    userId: 100,
    seatCount: purchasedSeatCount,
  });
}

async function generateShows(bands: Array<Band>) {
  console.log("\t\tGenerating shows...");
  const today = dayjs();
  const shows: Array<ShowWithoutAvailableSeatCount> = [];

  for (let daysInFuture = 0; daysInFuture < 14; daysInFuture++) {
    const scheduledAt = today.clone().add(daysInFuture, "days");
    const showId = scheduledAt.unix();
    const band = getUnique(bands, "bands", "shows");

    const show = { id: showId, scheduledAt: scheduledAt.toDate(), band };
    await generateavailableSeatCount(showId);
    shows.push(show);
  }
  await writeShows(shows);
}

export async function generateData(): Promise<void> {
  console.log("\tGenerating data...");
  const bands = await generateBands();
  await generateShows(bands);
}
