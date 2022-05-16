import { Spinner, Text } from "@chakra-ui/react";

export function LoadingSpinner({ display }: { display: boolean }) {
  const displaySpinner = display ? "inherit" : "none";

  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.800"
      color="gray.200"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      display={displaySpinner}
    >
      <Text display="none">Loading...</Text>
    </Spinner>
  );
}
