import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "@/lib/api/handler";
import { validateToken } from "@/lib/auth/utils";
import { addReservation } from "@/lib/features/reservations/queries";
import { getShowById } from "@/lib/features/shows/queries";

const handler = createHandler({ authRequired: true });
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { reservationId } = req.query;
  const { seatCount, userId, showId } = req.body;
  const tokenIsValid = await validateToken(req);
  if (!tokenIsValid) {
    return res.status(401).json({ message: "user not authenticated" });
  }
  const reservation = await addReservation({
    id: Number(reservationId),
    showId: Number(showId),
    userId: Number(userId),
    seatCount: Number(seatCount),
  });
  // get show info to return with reservation
  const show = await getShowById(reservation.showId);

  return res.status(201).json({ reservation: { ...reservation, show } });
});

export default handler;
