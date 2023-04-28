import { rest } from "msw";
import { readFakeData } from "@/__tests__/__mocks__/fakeData";

export const handlers = [
  rest.get("http://localhost:3000/shows/:showId", async (req, res, context) => {
    const { fakeShows } = await readFakeData();
    return res(context.json({ show: fakeShows[0] }));
  }),
];
