import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { type AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { LoadingSpinner } from "@/components/_common/LoadingSpinner";
import { QueryError } from "@/components/_common/QueryError";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { routes } from "@/lib/axios/routes";
import type { ReservationWithShow } from "@/lib/features/reservations/types";

// data strategy: Client-Side Rendering
// https://nextjs.org/docs/basic-features/data-fetching/client-side

export default function Confirmation() {
  const router = useRouter();

  const [reservation, setReservation] = useState<
    ReservationWithShow | undefined
  >();
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (router.isReady) {
      // both route parameters and query string are in `query` object
      const { reservationId, showId, seatCount } = router.query;
      axiosInstance
        .post<null, AxiosResponse<{ reservation: ReservationWithShow }>>(
          `/api/${routes.reservations}/${reservationId}`,
          {
            showId,
            userId,
            seatCount,
          }
        )
        .then((data) => setReservation(data.data.reservation))
        .catch((e) => {
          setError(e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (error)
    return <QueryError message={`Could not confirm reservation: ${error}`} />;

  return (
    <Box textAlign="center">
      <Heading>Ticket Purchase Confirmation</Heading>
      {reservation === undefined ? (
        <LoadingSpinner display />
      ) : (
        <Stack align="center">
          <Stack bg="green.700" p={3} m={2} rounded="md">
            <Text>{reservation.seatCount} seats confirmed for</Text>
            <Heading size="md">{reservation.show.band.name}!</Heading>
          </Stack>
          <HStack justify="center">
            <Link href="/user" passHref>
              <Button>See all purchases</Button>
            </Link>
            <Link href="/shows" passHref>
              <Button>Purchase more tickets</Button>
            </Link>
          </HStack>
        </Stack>
      )}
    </Box>
  );
}
