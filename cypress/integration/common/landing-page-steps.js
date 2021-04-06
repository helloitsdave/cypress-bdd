import { Then } from 'cypress-cucumber-preprocessor/steps';

const APPLICATION_HEADER = 'OpenOceanStudio: Crew Applications';

Then('I see the Application Header', () => {
  cy.get('.App-title')
    .should('have.text', APPLICATION_HEADER);
});
Then('I see the Applied, Interviewing and Hired Sections', () => {
  cy.contains('Applied')
    .should('be.visible');
  cy.contains('Interviewing')
    .should('be.visible');
  cy.contains('Hired')
    .should('be.visible');
});
