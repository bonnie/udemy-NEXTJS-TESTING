import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";

import { LoadingSpinner } from "@/components/_common/LoadingSpinner";
import { routes } from "@/lib/axios/routes";
import { useSessionStatus } from "@/lib/features/users/useSessionStatus";

import { NavLink } from "./NavLink";
import { SignOutButton } from "./SignOutButton";

export function NavBar(): React.ReactElement {
  const { isLoading, isLoggedIn } = useSessionStatus();
  const { data: session } = useSession();
  const userName = session?.user?.email ?? "My Profile";

  const links = [
    { display: "Shows", route: routes.shows },
    { display: "Bands", route: routes.bands },
    { display: isLoggedIn ? userName : "Sign In", route: routes.user },
  ];
  return (
    <Box bg="rgba(60, 60, 60, 0.6)" px={4} style={{ fontFamily: "Unica One" }}>
      <Flex h={16} alignItems="center" justify="space-between">
        <HStack spacing={8} alignItems="center">
          <Box pr={2} borderRight="2px">
            <NavLink href="/">
              <Text>Popular Concert Venue</Text>
            </NavLink>
          </Box>
          <HStack as="nav" spacing={4}>
            {links.map((link) => (
              <NavLink key={link.display} href={`/${link.route}`}>
                {link.display}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <HStack>
          <LoadingSpinner display={isLoading} />
          <SignOutButton />
        </HStack>
      </Flex>
    </Box>
  );
}
