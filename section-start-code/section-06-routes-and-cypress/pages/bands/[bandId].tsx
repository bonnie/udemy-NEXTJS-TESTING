import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

import { LoadingSpinner } from "@/components/_common/LoadingSpinner";
import { QueryError } from "@/components/_common/QueryError";
import { getBandById, getBands } from "@/lib/features/bands/queries";
import type { Band } from "@/lib/features/bands/types";
// SSG reference:
// https://nextjs.org/docs/basic-features/pages#scenario-2-your-page-paths-depend-on-external-data

export async function getStaticProps({
  params,
}: {
  params: { bandId: number };
}) {
  const { bandId } = params;
  let band = null;
  let error = null;
  try {
    // for SSG, talk directly to db (no need to go through API)
    band = await getBandById(Number(bandId));
  } catch (e) {
    if (e instanceof Error) error = e.message;
    if (e && typeof e === "object" && "toString" in e) error = e.toString();
  }
  return { props: { band, error } };
}

export async function getStaticPaths() {
  const bands = await getBands();

  const paths = bands.map((band) => ({
    params: { bandId: band.id.toString() },
  }));

  // Pre-render only these paths at build time.
  // { fallback: blocking } means pages for other paths
  //    get generated at request time (SSR).
  return { paths, fallback: "blocking" };
}

export default function BandPage({
  band,
  error,
}: {
  band: Band | null;
  error: string | null;
}): React.ReactElement {
  if (error)
    return <QueryError message={`Could not retrieve band data: ${error}`} />;

  return (
    <Box m={5} pt={5} textAlign="center">
      {!band ? (
        <LoadingSpinner display={!!band} />
      ) : (
        <VStack display={band ? "inherit" : "none"}>
          <Heading>{band.name}</Heading>
          <Text fontSize="xl" pb={5}>
            {band.description}
          </Text>
          <Box minW="70%" h="30em" pos="relative" textAlign="center">
            <Image
              src={`/band-images/${band.image.fileName}`}
              alt="band photo"
              objectFit="scale-down"
              layout="fill"
            />
          </Box>

          <Text
            fontStyle="italic"
            color="gray.300"
            fontFamily="Lato"
            fontSize="sm"
          >
            photo by{" "}
            <Link href={band.image.authorLink} isExternal>
              {band.image.authorName}
            </Link>
          </Text>
        </VStack>
      )}
    </Box>
  );
}
