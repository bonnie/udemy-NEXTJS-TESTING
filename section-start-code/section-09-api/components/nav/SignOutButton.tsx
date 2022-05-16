import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

import { useSessionStatus } from "@/lib/features/users/useSessionStatus";

export const SignOutButton: React.FC = () => {
  const { isLoading, isLoggedIn } = useSessionStatus();
  if (!isLoggedIn) return null;

  const handleClick = () => signOut({ redirect: false });

  return (
    <Button variant="nav" disabled={isLoading} onClick={handleClick}>
      Sign Out
    </Button>
  );
};
