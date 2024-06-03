import { render, screen } from "@testing-library/react";
import Home from ".";

test("MSW intercepts request", async () => {
  render(<Home />);

  const description = await screen.findByRole("heading", {
    name: "MSW response",
  });
  expect(description).toBeInTheDocument();
});
