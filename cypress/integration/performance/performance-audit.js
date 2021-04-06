before(() => {
  cy.visit('/');
});

/**
 * Attempting to utilize the cypress audit plugin https://github.com/mfrachet/cypress-audit
 * Unfortunately - I wasn't able to get it working against the app running locally on http://localhost:5000
 * Appears to be related to this open issue below and due to time constraints
 * I didn't get a chance to look into it further.
 * Skipping the test for now.
 * https://github.com/GoogleChrome/lighthouse/issues/3024
 */
describe('Crew Studio Performance Check', () => {
  it.skip('check lighthouse scores', () => {
    cy.lighthouse({
      performance: 100,
      accessibility: 80,
      'best-practices': 100,
      seo: 100,
      pwa: 100,
    });
  });
});

/**
 * For accessibility utilizing the cy.pa11y() tool. Additional configurations
 * are possible, just using the defaults below.
 */
describe('Crew Studio Accessibility Check', () => {
  it('validate accessibility scores', () => {
    cy.pa11y();
  });
});
