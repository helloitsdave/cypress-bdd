import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const crewNames = '.CrewMemeber-name > div:nth-of-type(1)';
const crewCities = '.CrewMemeber-name > div:nth-of-type(2)';
const crewContainers = '.CrewMember-container';
const allCrewMembers = '.CrewMember-container';
const filterButton = '#filters > [type="button"]';

/**
 * Note: I did not add many comments to this file as I think the
 * methods should be self explanitory
 */

Given('An Applicant exists with the name {string}', (name) => {
  cy.get(crewNames).contains(name);
});

Given('An Applicant exists from the city {string}', (city) => {
  cy.get(crewCities).contains(city);
});

Given('The Filter is cleared', () => {
  cy.get(filterButton).click();
});

When('I filter by the name {string}', (name) => {
  cy.get('#name').type(name);
  cy.get('[type="submit"]').click();
});

When('I filter by a city {string}', (city) => {
  cy.get('#city').type(city);
  cy.get('[type="submit"]').click();
});

Then('Only results which match the name {string} are returned', (name) => {
  cy.get(crewNames).each((crewName) => {
    cy.wrap(crewName).should('contain.text', name);
  });
});

Then('Only results which match the city {string} are returned', (city) => {
  cy.get(crewCities).each((crewCity) => {
    cy.wrap(crewCity).should('contain.text', city);
  });
});

Then('Only results which match the city {string} and {string} are returned', (city, name) => {
  cy.get(crewCities).each((crewCity) => {
    cy.wrap(crewCity).should('contain.text', city);
  });
  cy.get(crewNames).each((crewName) => {
    cy.wrap(crewName).should('contain.text', name);
  });
});

Then('{string} results are returned', (resultNumber) => {
  if (resultNumber < 1) {
    cy.get(crewContainers).should('not.exist');
  } else {
    cy.get(crewContainers).should('have.length', resultNumber);
  }
});

/**
 * Returns all the crew cards as the @allApplicants alias
 */
When('I view the Applicants', () => {
  cy.get(allCrewMembers).as('allApplicants');
});

Then('I should see a picture of each applicant', () => {
  cy.get('@allApplicants')
    .find('.CrewMemeber-photo')
    .each((photo) => {
      cy.wrap(photo).should('be.visible');
    });
});

Then('I should see the name of each applicant', () => {
  cy.get('@allApplicants')
    .find(crewNames)
    .each((name) => {
      cy.wrap(name)
        .should('be.visible')
        .and('have.length.of.at.least', 1);
    });
});

Then('I should see the city of each applicant', () => {
  cy.get('@allApplicants')
    .find(crewCities)
    .each((city) => {
      cy.wrap(city)
        .should('be.visible')
        .and('have.length.of.at.least', 1);
    });
});
