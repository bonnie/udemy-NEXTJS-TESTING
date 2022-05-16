import dayjs from "dayjs";

import { ShowWithoutAvailableSeatCount } from "@/lib/features/shows/types";

import { generateNewBand } from "./newBand";

export const generateNewShow = async (
  showId: number
): Promise<ShowWithoutAvailableSeatCount> => {
  // note: this band will not exist in the db,
  // so link to the band from the /shows page will not work
  const band = generateNewBand(showId);
  return {
    id: showId,
    band,
    scheduledAt: dayjs("2022-04-18").toDate(),
  };
};
