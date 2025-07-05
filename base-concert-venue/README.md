# Popular Concert Venue

### An app to support the Udemy course [Testing Next.js Apps](https://www.udemy.com/course/nextjs-testing/)

## Installation

1. Run `npm install`
1. Run `cp .env.development.local_template .env.development.local`
1. Run `cp .env.local_template .env.local`
1. In _.env.local_:

   - add long, hard-to-guess strings as the values for `NEXTAUTH_SECRET` and `REVALIDATION_SECRET`

     - here's a helpful command to generate a random string: `openssl rand -base64 32`

1. Data will be generated [the first time the shows page is loaded](https://github.com/bonnie/udemy-NEXTJS-TESTING/blob/main/base-concert-venue/pages/api/shows/index.ts#L11-L15).

   However, if you'd like to generate data before that, you can run `npm run data:generate`.

## Running the App

Run `npm run dev`. The app will be found at [http://localhost:3000]
