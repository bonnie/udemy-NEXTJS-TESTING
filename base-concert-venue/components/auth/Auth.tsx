// adapted from
// https://next-auth.js.org/getting-started/client#custom-client-session-handling

import { useRouter } from "next/router";
import { type ReactElement, useEffect } from "react";

import { useSessionStatus } from "@/lib/features/users/useSessionStatus";

export const Auth: React.FC<{ children: ReactElement }> = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useSessionStatus();

  // useEffect eliminates "No router instance found" errors
  // reference: https://nextjs.org/docs/messages/no-router-instance
  useEffect(() => {
    if (!isLoggedIn) {
      router.push(`/auth/signin?callbackUrl=${router.asPath}`);
    }
  }, [isLoggedIn, router]);

  return children;
};
