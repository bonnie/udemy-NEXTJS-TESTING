import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import { LoadingSpinner } from "@/components/_common/LoadingSpinner";
import { BandLinkHeading } from "@/components/bands/BandLinkHeading";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { routes } from "@/lib/axios/routes";
import { getShows as getShowsViaDbQuery } from "@/lib/features/shows/queries";
import type { Show } from "@/lib/features/shows/types";
import { formatDate } from "@/lib/features/shows/utils";

const THIRTY_SECONDS = 30 * 1000;

const getShowsViaAPI = async () => {
  const { data } = await axiosInstance.get(`/api/${routes.shows}`);
  return data.shows;
};

// ISR reference
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

// SWR + ISR reference:
// https://www.smashingmagazine.com/2021/09/useswr-react-hook-library-incremental-static-regeneration-nextjs/

export async function getStaticProps() {
  // can't use getShows here because getStaticProps runs while building;
  // Server isn't running while building!
  const isrShows = await getShowsViaDbQuery();

  return {
    props: { isrShows },
  };
}

export default function Shows({
  isrShows,
}: {
  isrShows: Array<Show>;
}): React.ReactElement {
  const router = useRouter();

  const { data: shows, isValidating } = useSWR<Array<Show>>(
    "/api/shows",
    getShowsViaAPI,
    {
      fallbackData: isrShows,
      refreshInterval: THIRTY_SECONDS,
    }
  );

  return (
    <Stack align="center" spacing={10}>
      <LoadingSpinner display={isValidating && !shows} />
      <Heading mt={10}>Upcoming Shows</Heading>
      <List width="100%" alignContent="center" pb={10}>
        {shows?.map((show) => (
          <ListItem
            key={show.id}
            width="100%"
            display="flex"
            mb={10}
            alignItems="center"
          >
            <Box mr={5} width="30%" textAlign="right">
              {formatDate(show.scheduledAt)}
            </Box>
            <Box width="10%" textAlign="center">
              {show.availableSeatCount <= 0 ? (
                <Heading size="md" color="red.500">
                  sold out
                </Heading>
              ) : (
                <Button onClick={() => router.push(`/reservations/${show.id}`)}>
                  tickets
                </Button>
              )}
            </Box>
            <Box>
              <BandLinkHeading band={show.band} />
              <Text fontStyle="italic" color="gray.400" fontFamily="Lato">
                {show.band.description}
              </Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
