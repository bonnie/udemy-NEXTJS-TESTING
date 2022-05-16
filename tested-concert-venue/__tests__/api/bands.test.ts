/* eslint-disable no-param-reassign */
import { testApiHandler } from "next-test-api-route-handler";

import bandsHandler from "@/pages/api/bands";

test("POST /api/bands returns 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: bandsHandler,
    paramsPatcher: (params) => {
      params.queryStringURLParams = { secret: "NOT THE REAL SECRET" };
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST" });
      expect(res.status).toEqual(401); // this means the secret was incorrect
    },
  });
});
