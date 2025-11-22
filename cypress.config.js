const { defineConfig } = require("cypress");

const envVariables = {
  base_url: "https://recruitment-staging-queenbee.paradev.io",
}

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    overwrite: true,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss'
  },  
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
    chromeWebSecurity: false,
    defaultCommandTimeout: 60000,
    env:{
      ...envVariables
    },
  },
});
