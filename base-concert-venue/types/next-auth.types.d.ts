// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

import type { User } from "@/lib/features/users/types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }
}
