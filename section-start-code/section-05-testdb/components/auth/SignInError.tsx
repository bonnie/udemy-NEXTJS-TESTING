import { Box, Text } from "@chakra-ui/react";

export const SignInError = ({ error }: { error: string | Array<string> }) => {
  const errors = typeof error === "string" ? [error] : error;

  return (
    <Box bg="red.700" p={5} rounded="lg" role="alert">
      {errors.map((errorText) => (
        <Text key={errorText}>{errorText}</Text>
      ))}
    </Box>
  );
};
