import { resetDB } from "__tests__/__mocks__/db/utils/reset-db";
import { defineConfig } from "cypress";
import { addBand } from "lib/features/bands/queries";
import { addReservation } from "lib/features/reservations/queries";

export default defineConfig({
  env: {
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
    // to access within a test function:
    //  Cypress.env("REVALIDATION_SECRET")
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on("task", {
        "db:reset": () => resetDB().then(() => null),
        addBand: (newBand) => addBand(newBand).then(() => null),
        addReservation: (newReservation) =>
          addReservation(newReservation).then(() => null),
      });
    },
  },
});
