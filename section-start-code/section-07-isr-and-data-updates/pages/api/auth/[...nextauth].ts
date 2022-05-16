/* eslint-disable no-param-reassign */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { axiosInstance } from "@/lib/axios/axiosInstance";
import { routes } from "@/lib/axios/routes";
import type { User } from "@/lib/features/users/types";

export default NextAuth({
  providers: [
    // reference: https://next-auth.js.org/configuration/providers/credentials#how-to
    CredentialsProvider({
      id: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, email, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "test" },
        password: { label: "Password", type: "password", placeholder: "test" },
      },
      async authorize(credentials) {
        const { data: user } = await axiosInstance({
          url: `/api/${routes.users}`,
          method: "POST",
          data: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        // If no error and we have user data, return it
        // Return null if user data could not be retrieved
        return user ?? null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    // reference: https://next-auth.js.org/configuration/options#session
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // reference: https://next-auth.js.org/configuration/callbacks#jwt-callback
      // Persist the JWT token to the token right after signin
      if (user) {
        token.user = user.user;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token, user }) {
      // reference: https://next-auth.js.org/configuration/callbacks#session-callback
      // Send properties to the client, like an access_token from a provider

      const tokenUser = token.user as User;

      session.token = tokenUser.token;
      session.user = tokenUser;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
