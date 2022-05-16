import { ChakraProvider } from "@chakra-ui/react";
import type { AppInitialProps } from "next/app";
import type { Router } from "next/router";
import type { NextComponentType } from "next/types";
import { SessionProvider } from "next-auth/react";

import { Layout } from "@/components/_common/Layout";
import { Auth } from "@/components/auth/Auth";
import { theme } from "@/lib/theme";

// note: need to use `type` (not `interface`) because not all
// NextComponentType members are statically typed
// Generally prefer interface for better error messages
// (see https://www.typescripttutorial.net/typescript-tutorial/typescript-extend-interface/)
type ComponentWithAuth = NextComponentType & { auth: boolean };
interface AppPropsWithAuth extends AppInitialProps {
  Component: ComponentWithAuth;
  router: Router;
}

export default function PopularMusicVenue({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithAuth) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          {/* adapted from https://next-auth.js.org/getting-started/client#custom-client-session-handling */}
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}{" "}
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}
