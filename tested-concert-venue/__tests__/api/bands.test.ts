/* eslint-disable no-param-reassign */
import { testApiHandler } from "next-test-api-route-handler";

import bandsHandler from "@/pages/api/bands";

test("POST /api/bands returns 401 status for incorrect revalidation secret", async () => {
  await testApiHandler({
    handler: bandsHandler,
    // updated not to use queryStringURLParams; for details, see
    // https://www.udemy.com/course/nextjs-testing/learn/#questions/19882336/
    paramsPatcher: (params) => {
      params.secret = "NOT THE REAL SECRET";
    },
    test: async ({ fetch }) => {
      const res = await fetch({ method: "POST" });
      expect(res.status).toEqual(401); // this means the secret was incorrect
    },
  });
});
