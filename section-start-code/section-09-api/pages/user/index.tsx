import { Box, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { UserReservations } from "@/components/user/UserReservations";

// data strategy: Client-Side Rendering with SWR (within UserReservations component)
// (static pages or ISR doesn't make sense; only one user is using this page!
// no advantage to caching.)
// Why not SSR? no need for SEO either, esp since it's behind auth barrier!
//    plus SSR is slow

export default function UserProfile() {
  const { data: session } = useSession();

  const userId = session?.user?.id;

  if (!session || !userId) return null;

  return (
    <Box textAlign="center" m={5}>
      <Heading>Welcome {session?.user?.email}</Heading>
      <UserReservations userId={userId} />
    </Box>
  );
}

UserProfile.auth = true;
