import { useSession } from "next-auth/react";

interface SessionStatuses {
  isLoggedIn: boolean;
  isLoading: boolean;
}

export const useSessionStatus = (): SessionStatuses => {
  const { status } = useSession();
  return {
    isLoading: status === "loading",
    isLoggedIn: status === "authenticated",
  };
};
