import { Heading, Text, VStack } from "@chakra-ui/react";

export function QueryError({ message }: { message: string }) {
  return (
    <VStack
      align="center"
      bgColor="red.700"
      p={10}
      m={10}
      rounded="lg"
      role="alert"
    >
      <Heading size="md">{message}</Heading>
      <Text>please try again later</Text>
    </VStack>
  );
}
