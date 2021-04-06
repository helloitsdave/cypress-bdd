import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

const appliedCrewMembers = '.App-column:nth-child(1) .CrewMember-container';
const interviewingCrewMembers = '.App-column:nth-child(2) .CrewMember-container';
const hiredCrewMembers = '.App-column:nth-child(3) .CrewMember-container';

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

Given('The applicant {string} has a status of Interviewing', (name) => {
  cy.get(interviewingCrewMembers)
    .contains(interviewingCrewMembers, name)
    .as('crewMember');
});

Given('The applicant {string} has a status of Applied', (name) => {
  cy.get(appliedCrewMembers)
    .contains(appliedCrewMembers, name)
    .as('crewMember');
});

Given('The applicant {string} has a status of Hired', (name) => {
  cy.get(hiredCrewMembers)
    .contains(hiredCrewMembers, name)
    .as('crewMember');
});

When('I move {string} from Applied to Interviewing', (name) => {
  cy.get(appliedCrewMembers)
    .contains(appliedCrewMembers, name)
    .find('button.CrewMember-up').click();
});

When('I move {string} from Interviewing to Hired', (name) => {
  cy.get(interviewingCrewMembers)
    .contains(interviewingCrewMembers, name)
    .find('button.CrewMember-up').click();
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
