import { Box, Heading, List, ListItem, Stack, Text } from "@chakra-ui/react";
import React from "react";

import { BandLinkHeading } from "@/components/bands/BandLinkHeading";
import { getBands } from "@/lib/features/bands/queries";
import type { Band } from "@/lib/features/bands/types";

const removeLeadingThe = (bandName: string) => bandName.replace(/^the /i, "");

// ISR reference
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

export async function getStaticProps() {
  const isrBands = await getBands();
  isrBands.sort((a, b) =>
    removeLeadingThe(a.name) > removeLeadingThe(b.name) ? 0 : -1
  );

  return {
    props: { isrBands },
  };
}

export default function Bands({
  isrBands,
}: {
  isrBands: Array<Band>;
}): React.ReactElement {
  return (
    <Stack align="center" spacing={10}>
      <Heading mt={10}>Our Illustrious Performers</Heading>
      <List alignContent="center" pb={10}>
        {isrBands.map((band) => (
          <ListItem key={band.id} display="flex" mb={10} alignItems="center">
            <Box>
              <BandLinkHeading band={band} />
              <Text fontStyle="italic" color="gray.400" fontFamily="Lato">
                {band.description}
              </Text>
            </Box>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
