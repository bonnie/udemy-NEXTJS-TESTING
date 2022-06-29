import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { generateData } from "@/lib/db/data/generateData";
import { addShow, getShows } from "@/lib/features/shows/queries";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  let shows = await getShows();

  // generate shows if there aren't any
  if (shows.length === 0) {
    await generateData();
    shows = await getShows();
  }

  return res.status(200).json({ shows });
});

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // an endpoint to demonstrate on-demand ISR revalidation
  //   https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#using-on-demand-revalidation
  // in an actual app, this would have a UI, and it would need authorization
  //   to check the user is authorized to make changes to shows
  // in this app, this endpoint will be hit by testing directly to test on-demand ISR revalidation

  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Invalid revalidation token" });
  }

  // add show (here is where authorization would be validated)
  const { newShow } = req.body;
  const addedShow = await addShow(newShow);

  // revalidate shows page for ISR
  await res.revalidate("/shows");
  return res.json({ show: addedShow, revalidated: true });
});

export default handler;
