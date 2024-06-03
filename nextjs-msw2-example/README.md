# Next.js and MSW 2

## NOTE: this is for the `pages` router

It is a [known issue](https://github.com/mswjs/msw/issues/1644) that MSW does not work with the `app` router.

## Installs to create this app

1. `npx create-next-app --example with-jest nextjs-msw2-example`
   reference: https://nextjs.org/docs/app/building-your-application/testing/jest#quickstart
1. `npm install --save-dev @testing-library/react@latest msw@latest undici`
1. `npx msw init ./public --save`
   reference: https://mswjs.io/docs/cli/init/#arguments

## Test config

- remove \_\_tests\_\_ folder

- add _jest.polyfills.js_, according to:

  - https://mswjs.io/docs/migrations/1.x-to-2.x#remap-fetch-api-globals
  - https://github.com/mswjs/msw/discussions/1934
  - https://github.com/mswjs/msw/issues/2082#issuecomment-1989697293

- update _jest.config.js_

```js
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  testEnvironment: "jsdom",

  //////// ADDED THESE LINES /////////////////////////////////////////
  // https://mswjs.io/docs/migrations/1.x-to-2.x#remap-fetch-api-globals
  setupFiles: ["./jest.polyfills.js"],

  // reference: https://stackoverflow.com/questions/77399773/cannot-find-module-msw-node-from
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  //////// END: ADDED LINES /////////////////////////////////////////
};
```

## Update files

- rewrite _pages/home/index.tsx_ to include `fetch` call
- add _pages/home/index.test.tsx_
- update _jest.setup.js_ and create \_\_mocks\_\_ directory, following https://github.com/mswjs/examples/tree/main/examples/with-jest

## Other reference

- See [Next.js --with-msw example](https://github.com/vercel/next.js/tree/canary/examples/with-msw) for an example of using environment variables to enable / disable mocking. Note: this example does not show setup or examples of any tests with Jest or React Testing Library.
