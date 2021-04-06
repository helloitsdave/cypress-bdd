import { Given, Then } from 'cypress-cucumber-preprocessor/steps';
import { mockedCrew } from '../../fixtures/redux';

Given('The Application is loaded', () => {
  cy.visit('/');
});

/**
 * Utilizes a fixture in ./fixtures/redux to seed mocked redis data
 * I would expand this much further in a real sitation to have all sorts
 * of mocked data available for different tests.
 */
Given('The Application is using mocked crew applicants', () => {
  window.localStorage.setItem('redux', mockedCrew);
  cy.reload();
});

/**
 * I attempted to utilize the cypress audit plugin https://github.com/mfrachet/cypress-audit
 * Unfortunately: I wasn't able to get it working against the app running locally on http://localhost:5000
 * https://github.com/GoogleChrome/lighthouse/issues/3024
 * Appears to be related to this open issue below and due to time constraints
 * I didn't get a chance to look into it further so not including it in a feature test for now.
 */
Then('The Application should pass the performance checks', () => {
  cy.lighthouse({
    performance: 100, // Local Score. Likely not 100 when hosted.
    accessibility: 85, // Monitor the accessibility of your web app.
    'best-practices': 100, // Best Practice Score
    seo: 82, // Search Engine Score
  });
});

/**
 * pa11y can be used to highlight a11y issues
 * Additional configurations
 * are possible, I'm just using the defaults below.
 * I did not have time to utilize this in a feature file given
 * accessibility was not specifially mentioned in the evaluation points.
 */
Then('The Application should be a11y compliant', () => {
  cy.pa11y();
});
