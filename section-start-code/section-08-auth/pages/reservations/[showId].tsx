import { useRouter } from "next/router";
import React from "react";

import { Reservation } from "@/components/reservations/Reservation";

export default function Reservations() {
  const router = useRouter();
  const { showId } = router.query;

  const submitPurchase = ({
    reservationId,
    reservedSeatCount,
  }: {
    reservationId: number;
    reservedSeatCount: number;
  }) => {
    router.push(
      `/confirmation/${reservationId}?seatCount=${reservedSeatCount}&showId=${showId}`
    );
  };

  if (!showId) return null;
  return (
    <Reservation showId={Number(showId)} submitPurchase={submitPurchase} />
  );
}

Reservations.auth = true;
