import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

export const theme = extendTheme(
  {
    initialColorMode: "dark",
    useSystemColorMode: false,
    styles: {
      global: {
        body: {
          color: "gray.50",
          backgroundColor: "gray.900",
          ringColor: "gray.500",
        },
        input: {
          borderColor: "gray.700",
        },
      },
    },
    shadows: {
      outline: "0 0 0 3px rgba(125, 125, 125, 0.6)",
    },
    fonts: {
      body: "Unica One, sans-serif",
      heading: "Unica One, sans-serif",
      mono: "Menlo, monospace",
    },
    components: {
      Button: {
        variants: {
          solid: {
            bg: "gray.700",
            _hover: {
              bg: "gray.500",
            },
          },
          outline: {
            borderColor: "gray.500",
            color: "gray.600",
          },
          nav: {
            type: "button",
            px: 2,
            py: 1,
            rounded: "md",
            bgColor: "transparent",
            _hover: {
              textDecoration: "none",
              bgColor: "black",
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "gray" })
);
