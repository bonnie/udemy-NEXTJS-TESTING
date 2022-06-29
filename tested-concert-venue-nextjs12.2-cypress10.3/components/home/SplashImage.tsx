import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { ReactElement } from "react";

export function SplashImage(): ReactElement {
  return (
    <Box
      pos="fixed"
      top={0}
      left={0}
      h="100vh"
      w="100vw"
      overflow="hidden"
      zIndex={-1}
    >
      <Image
        alt="Concert goer with hands in the shape of a heart"
        src="/splash/heart-hands.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </Box>
  );
}
