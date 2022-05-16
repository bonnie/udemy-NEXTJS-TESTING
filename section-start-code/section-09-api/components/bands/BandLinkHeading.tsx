import { Heading } from "@chakra-ui/react";
import Link from "next/link";

import type { Band } from "@/lib/features/bands/types";

export const BandLinkHeading = ({ band }: { band: Band }) => (
  <Link href={`/bands/${band.id}`} passHref>
    <Heading
      size="md"
      _hover={{ textDecoration: "underline", cursor: "pointer" }}
    >
      {band.name.toLocaleLowerCase()}
    </Heading>
  </Link>
);
