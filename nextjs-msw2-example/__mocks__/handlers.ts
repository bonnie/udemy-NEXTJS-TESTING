import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3000/api/description", () => {
    return HttpResponse.json({
      description: "MSW response",
    });
  }),
];
