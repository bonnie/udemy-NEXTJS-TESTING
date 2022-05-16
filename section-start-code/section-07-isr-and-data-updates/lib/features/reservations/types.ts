import type { Show } from "../shows/types";
// TODO: type vs interface consistency
export interface Reservation {
  id: number;
  showId: number;
  userId: number;
  seatCount: number;
}

export interface ReservationWithShow extends Reservation {
  show: Show;
}
