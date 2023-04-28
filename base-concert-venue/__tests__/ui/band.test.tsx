import { render, screen } from "@testing-library/react";

import BandComponent from "@/pages/bands/[bandId]";
import { readFakeData } from "@/__tests__/__mocks__/fakeData";

test("band component displays correnct band information", async () => {
  const { fakeBands } = await readFakeData();
  render(<BandComponent band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });

  expect(heading).toBeInTheDocument();

  // more tests here...
});

test("band component displays error message upon error", () => {
  const errorMessage = "Can not load band info";
  render(<BandComponent band={null} error={errorMessage} />);

  const error = screen.getByRole("heading", {
    name: /can not load band info/i,
  });

  expect(error).toBeInTheDocument();
});
