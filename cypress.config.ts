import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log(message) {
          console.log(message)

          return null
        },
      })
    },
  },
});
