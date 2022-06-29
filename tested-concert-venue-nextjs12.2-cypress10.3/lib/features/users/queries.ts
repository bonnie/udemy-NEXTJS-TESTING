/* ****** Add new user ***** */
import { Operation } from "fast-json-patch";

import {
  deleteItem,
  filenames,
  getItemById,
  getJSONfromFile,
  updateItem,
  writeJSONToFile,
} from "@/lib/db/db-utils";
import { getReservations } from "@/lib/features/reservations/queries";
import type { ReservationWithShow } from "@/lib/features/reservations/types";
import { getShowById } from "@/lib/features/shows/queries";

import type { AuthUser, NewAuthUser } from "./types";

export function getUsers(): Promise<AuthUser[]> {
  return getJSONfromFile<AuthUser>(filenames.users);
}

export async function getUserById(userId: number): Promise<AuthUser> {
  return getItemById<AuthUser>(userId, filenames.users, "user");
}

export async function addUser(newUserData: NewAuthUser): Promise<AuthUser> {
  const users = await getUsers();

  // get the max id from the existing ids
  const ids: number[] = Object.values(users).map((u) => u.id);
  const maxId = ids.reduce(
    (tempMaxId: number, itemId: number) =>
      itemId > tempMaxId ? itemId : tempMaxId,
    0
  );

  // the new user will have an id of the max id plus 1
  const newUserId = maxId + 1;

  const newUser = { ...newUserData, id: newUserId };
  await writeJSONToFile(filenames.users, [...users, newUser]);
  return newUser;
}

export async function updateUser(
  userId: number,
  patch: Operation[]
): Promise<AuthUser> {
  return updateItem<AuthUser>(userId, filenames.users, patch);
}

export async function deleteUser(userId: number): Promise<number> {
  return deleteItem<AuthUser>(filenames.users, userId);
}

export async function getReservationsByUserId(
  userId: number
): Promise<Array<ReservationWithShow>> {
  const reservations = await getReservations();
  const userReservations = reservations.filter(
    (reservation) => reservation.userId === userId
  );
  const shows = await Promise.all(
    userReservations.map((reservation) => getShowById(reservation.showId))
  );
  return userReservations.map((reservation, i) => ({
    ...reservation,
    show: shows[i],
  }));
}
