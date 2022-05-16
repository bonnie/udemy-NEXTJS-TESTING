import { venueCapacity } from "@/lib/db/constants";
import {
  deleteItem,
  filenames,
  getItemById,
  getJSONfromFile,
  writeJSONToFile,
} from "@/lib/db/db-utils";

import type { Reservation } from "./types";

type availableSeatCountByShowId = Record<number, number>;

export async function getReservations(): Promise<Array<Reservation>> {
  return getJSONfromFile<Reservation>(filenames.reservations);
}

export async function writeReservations(
  newReservationsArray: Array<Reservation>
): Promise<void> {
  return writeJSONToFile<Reservation>(
    filenames.reservations,
    newReservationsArray
  );
}

export async function getReservationsByShowId(
  showId: number
): Promise<Array<Reservation>> {
  const reservations = await getReservations();
  return reservations.filter((r) => r.showId === showId);
}

export async function getReservationById(
  id: number
): Promise<Reservation | null> {
  try {
    const reservation = await getItemById<Reservation>(
      id,
      filenames.reservations,
      "reservation"
    );
    return reservation;
  } catch (e) {
    if (e instanceof Error && e.message === "reservation not found") {
      return null;
    }
    throw e;
  }
}

export async function getAvailableSeatCountByShowId(): Promise<availableSeatCountByShowId> {
  const reservations = await getReservations();
  const availableSeats: availableSeatCountByShowId = {};
  reservations.forEach((reservation) => {
    const { showId, seatCount } = reservation;
    const availableSeatCountBefore = availableSeats[showId] ?? venueCapacity;
    availableSeats[showId] = availableSeatCountBefore - seatCount;
  });

  return availableSeats;
}

// return value represents whether or not show is sold out
export async function addReservation(
  reservation: Reservation
): Promise<Reservation> {
  // don't write the same reservation twice
  const existingReservation = await getReservationById(reservation.id);
  if (existingReservation) return reservation;

  const reservations = await getReservations();
  reservations.push(reservation);
  await writeReservations(reservations);
  return reservation;
}

export async function deleteReservation(id: number): Promise<void> {
  await deleteItem<Reservation>(filenames.reservations, id);
}
