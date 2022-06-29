import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { validateToken } from "@/lib/auth/utils";
import { getReservationsByUserId } from "@/lib/features/users/queries";

const handler = createHandler({ authRequired: true });
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const tokenIsValid = await validateToken(req);
  if (!tokenIsValid) {
    return res.status(401).json({ message: "user not authenticated" });
  }
  const userReservations = await getReservationsByUserId(Number(userId));
  return res.status(200).json({ userReservations });
});

export default handler;
