import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const appliedCrewMembers = '.App-column:nth-child(1) .CrewMember-container';
const interviewingCrewMembers = '.App-column:nth-child(2) .CrewMember-container';
const hiredCrewMembers = '.App-column:nth-child(3) .CrewMember-container';
const moveCrewMemberRightButton = 'button.CrewMember-up';

/**
 * Validates that in the Array of Interviewing CrewMembers
 * that one matching the passed in name exists.
 * Returns an alias of the particular CrewMember-container
 */
Given('The applicant {string} has a status of Interviewing', (name) => {
  cy.get(interviewingCrewMembers)
    .contains(interviewingCrewMembers, name)
    .as('crewMember');
});

/**
 * Validates that in the Array of Applied CrewMembers
 * that one matching the passed in name exists.
 * Returns an alias of the particular CrewMember-container
 */
Given('The applicant {string} has a status of Applied', (name) => {
  cy.get(appliedCrewMembers)
    .contains(appliedCrewMembers, name)
    .as('crewMember');
});

/**
 * Validates that in the Array of Hired CrewMembers
 * that one matching the passed in name exists.
 * Returns an alias of the particular CrewMember-container
 */
Given('The applicant {string} has a status of Hired', (name) => {
  cy.get(hiredCrewMembers)
    .contains(hiredCrewMembers, name)
    .as('crewMember');
});

When('I move {string} from Applied to Interviewing', (name) => {
  cy.get(appliedCrewMembers)
    .contains(appliedCrewMembers, name)
    .find(moveCrewMemberRightButton).click();
});

When('I move {string} from Interviewing to Hired', (name) => {
  cy.get(interviewingCrewMembers)
    .contains(interviewingCrewMembers, name)
    .find(moveCrewMemberRightButton).click();
});

Then('The Applied Appliants should not have a move left button', () => {
  cy.get(appliedCrewMembers).each((crewMember) => {
    cy.wrap(crewMember).contains('<').should('not.exist');
  });
});

Then('The Hired Appliants should not have a move right button', () => {
  cy.get(hiredCrewMembers).each((crewMember) => {
    cy.wrap(crewMember).find(moveCrewMemberRightButton).should('not.exist');
  });
});

When('I move {string} from Hired to Interviewing', (name) => {
  cy.get(hiredCrewMembers)
    .contains(hiredCrewMembers, name)
    .find('button')
    .contains('<')
    .click();
});

When('I move {string} from Interviewing to Applied', (name) => {
  cy.get(interviewingCrewMembers)
    .contains(interviewingCrewMembers, name)
    .find('button')
    .contains('<')
    .click();
});

/**
 * Making use of the .as to store a reference to the returned object.
 * This allows the object or value to be passed between steps.
 * @column String - 'Applied' 'Interviewing' 'Hired'
 */
When('I view the {string} Applications', (column) => {
  switch (column) {
    case 'Applied': {
      cy.get(appliedCrewMembers).as('applied');
      break;
    }
    case 'Interviewing': {
      cy.get(interviewingCrewMembers).as('interviewing');
      break;
    }
    case 'Hired': {
      cy.get(hiredCrewMembers).as('hired');
      break;
    }
    default: throw new Error('Incorrect Column Value Specified. Should be Applied, Interviewing or Hired');
  }
});

/**
 * This method utilizes the stored @applied, @interviewing and @hired
 * variables in the method above.
 * Checks that the expectedNumber of appliants appear in the column
 * @expectedNumber String - Expected Number of Applicants
 * @column String - 'Applied' 'Interviewing' 'Hired'
 */
Then('I get {string} {string} Applicants', (expectedNumber, column) => {
  switch (column) {
    case 'Applied': {
      cy.get('@applied')
        .should('have.lengthOf', Number(expectedNumber));
      break;
    }
    case 'Interviewing': {
      cy.get('@interviewing')
        .should('have.lengthOf', Number(expectedNumber));
      break;
    }
    case 'Hired': {
      cy.get('@hired')
        .should('have.lengthOf', Number(expectedNumber));
      break;
    }
    default: throw new Error('Incorrect Column Value Specified. Should be Applied, Interviewing or Hired');
  }
});

/**
 * Validates the cases where there are no applicants in a given column
 * @column String - 'Applied' 'Interviewing' 'Hired'
 */
Then('I get no {string} Applicants', (column) => {
  switch (column) {
    case 'Applied': {
      cy.get(appliedCrewMembers).should('not.exist');
      break;
    }
    case 'Interviewing': {
      cy.get(interviewingCrewMembers).should('not.exist');
      break;
    }
    case 'Hired': {
      cy.get(hiredCrewMembers).should('not.exist');
      break;
    }
    default: throw new Error('Incorrect Column Value Specified. Should be Applied, Interviewing or Hired');
  }
});
