/* eslint-disable @typescript-eslint/no-shadow */
import {
  Box,
  Button,
  Heading,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

import { LoadingSpinner } from "@/components/_common/LoadingSpinner";
import { QueryError } from "@/components/_common/QueryError";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { routes } from "@/lib/axios/routes";
import { generateRandomId } from "@/lib/features/reservations/utils";
import type { Show } from "@/lib/features/shows/types";
import { formatDate } from "@/lib/features/shows/utils";

const DEFAULT_TICKET_COUNT = 2;
const FIFTEEN_SECONDS = 15 * 1000;

const getShowsViaAPI = async (showId: number) => {
  const { data } = await axiosInstance.get(`/api/${routes.shows}/${showId}`);
  return data.show;
};

interface ReservationProps {
  showId: number;
  submitPurchase: ({
    reservationId,
    reservedSeatCount,
  }: {
    reservationId: number;
    reservedSeatCount: number;
  }) => void;
}

export const Reservation = ({ showId, submitPurchase }: ReservationProps) => {
  const [reservedSeatCount, setReservedSeatCount] =
    React.useState(DEFAULT_TICKET_COUNT);
  const reservationId = generateRandomId();
  const onSubmit = () => submitPurchase({ reservationId, reservedSeatCount });

  const {
    data: show,
    error,
    isValidating,
  } = useSWR<Show>(
    showId || showId === 0 ? `/api/show/${showId}` : null,
    () => getShowsViaAPI(showId),
    {
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateOnFocus: true,
      refreshInterval: FIFTEEN_SECONDS,
    }
  );

  if (error) return <QueryError message="Could not retrieve show info" />;

  return (
    <Stack align="center" spacing={10}>
      <LoadingSpinner display={isValidating && !show} />
      {show ? (
        <VStack spacing={2}>
          <Heading mt={10} size="md">
            Reserve your seats for
          </Heading>
          <Heading>{show.band.name}</Heading>
          <Text size="lg">{formatDate(show.scheduledAt)}</Text>
          {show.availableSeatCount === 0 ? (
            <Heading color="red.500">Show is sold out!</Heading>
          ) : (
            <>
              <Heading
                size="md"
                color={show.availableSeatCount < 10 ? "red.500" : "inherit"}
              >
                {show.availableSeatCount} seats left
              </Heading>
              <HStack pt={10} pb={3}>
                <NumberInput
                  value={reservedSeatCount}
                  onChange={(value) => setReservedSeatCount(Number(value))}
                  min={1}
                  max={Math.min(8, show.availableSeatCount)}
                  precision={0}
                  color="gray.100"
                  maxWidth="80px"
                  name="availableSeatCount"
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Heading size="md">Tickets</Heading>
              </HStack>
              <Box textAlign="center">
                <Button onClick={onSubmit}>purchase</Button>
              </Box>
            </>
          )}
        </VStack>
      ) : null}
    </Stack>
  );
};
