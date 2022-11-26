import { Button, Heading, List } from "@chakra-ui/react";
import Link from "next/link";
import useSWR from "swr";

import { QueryError } from "@/components/_common/QueryError";
import { UserReservation } from "@/components/user/UserReservation";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { routes } from "@/lib/axios/routes";
import type { ReservationWithShow } from "@/lib/features/reservations/types";

import { LoadingSpinner } from "../_common/LoadingSpinner";

const getUserReservations = async (
  userId?: number
): Promise<Array<ReservationWithShow> | null> => {
  if (!userId && typeof userId !== "number") return Promise.resolve(null);
  const data = await axiosInstance.get<
    null,
    { data: { userReservations: Array<ReservationWithShow> } }
  >(`/api/${routes.users}/${userId}/reservations`);

  return data.data.userReservations;
};

export const UserReservations = ({ userId }: { userId: number }) => {
  const {
    data: userReservations,
    error,
    isValidating,
  } = useSWR(`user/${userId}/reservations`, () => getUserReservations(userId), {
    fallbackData: [],
  });

  if (error)
    return (
      <QueryError
        message={`could not retrieve reservations: ${error?.message}`}
      />
    );

  if (isValidating) return <LoadingSpinner display />;

  if (!userReservations || userReservations.length === 0)
    return (
      <Link href="/shows" passHref>
        <Button mt={10}>Purchase tickets</Button>
      </Link>
    );

  return (
    <>
      <Heading mt={10}>Your Tickets</Heading>
      <List mt={5}>
        {userReservations.map((reservation) => (
          <UserReservation key={reservation.id} reservation={reservation} />
        ))}
      </List>
      <Link href="/shows" passHref>
        <Button mt={10}>Purchase more tickets</Button>
      </Link>
    </>
  );
};
