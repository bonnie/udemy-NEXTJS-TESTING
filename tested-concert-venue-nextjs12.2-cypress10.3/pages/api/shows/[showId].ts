import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { getShowById } from "@/lib/features/shows/queries";

const handler = createHandler();
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { showId } = req.query;
  const show = await getShowById(Number(showId));
  return res.status(200).json({ show });
});

export default handler;
