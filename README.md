# oos-ca-cypress-bdd

This repo is an example Test Framework using https://www.cypress.io with Cucumber BDD

## Prerequisites

- [node](https://docs.npmjs.com/getting-started/installing-node) and [yarn](https://classic.yarnpkg.com/en/) are installed

- For the cypress.io system requirements please see [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements)

- [Docker](https://www.docker.com/) should be installed on the CI system

- git clone this repo locally, then in your terminal cd into the oss-ca-cypress-bdd folder

- To install the packages run `yarn install`

## Test Execution

Firstly ensure the oos-ca application is up and running on http://localhost:5000 using the instructions in the app README to build and start via docker.

There are several ways to run the suite. It's also possible to run subsets or targeted tests using the cucumber tagging feature.

| Folder                                                                   | Description                          |
| ------------------------------------------------------------------------ | ------------------------------------ |
| Run In Interactive Mode                                                  | `yarn cypress open`                  |
| Run All Tests In CLI Mode (electron headless)                            | `yarn cypress run`                   |
| Run In CLI Mode with chrome                                              | `yarn cypress run --browser chrome`  |
| Run In CLI Mode only the tests tagged @Mocked                            | `yarn cypress run -e TAGS='@Mocked'` |
| Run In CLI Mode with headless mobile viewport size {package.json script} | `yarn run test-mobile-width-360`     |
| Run In CLI Mode using Docker {package.json script}                       | `yarn run test-chrome-docker`        |

You can also select which browser to use in the top right of the cypress app.

It is possible to run using electron in CI without any additional browsers installed.

For additional browsers I run the tests using cypress/browsers or cypress/included

## BDD Test Format

I created tests in the 'Given, When, Then' BDD format. Feature files were created using the Gherkin language syntax.

I've written the steps in a declarative way and avoided using UI specific language unless it's a UI specific check. This allows the team to decide which layer to implement each step and also caters for underlying workflow changes not impacting the scenarios.

I imagine in a more complete version of the product that there may be front bff or backend APIs involved, so I would be using a mix of APIs to gather data and setup data as opposed to doing everything through the UI.

### Test Related Folders

Test related files can be found in the following folders.

| Folder                       | Description                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------- |
| ./cypress/integration        | Feature Files. These are the BDD tests written in Gherkin Format. Have the extension .feature |
| ./cypress/integration/common | Step Files. Implements the Feature File statements using cypress commands                     |
| ./cypress/fixtures           | Contains an Example of Mocked Redux Test Data.                                                |

## Test Overview

Below are some high level clarifications on the purpose of the different tests.

| Feature File                   | Description                                                               |
| ------------------------------ | ------------------------------------------------------------------------- |
| InitialAppState.feature        | Tests the initial loading state of the application                        |
| Filtering.feature              | Validates the filtering mechanisms                                        |
| HiringStageTransitions.feature | Tests the moving of crew cards across the different Hiring stages         |
| MockedCrew.feature             | Example Feature of using mocked redux data to add additional crew members |

## CI Readiness

I ensured the framework is fully shareable and suitable for CI with the following

- Ability to run on docker
- package.json - All Framework Dependancies have been included
- Added git.ignore to avoid checking in non required items like videos or node_modules
- Added scripts in package.json to facilitate easy execution
- Included example Jenkinsfile
- JUnit Reporter enabled to integrate easily with Jenkins or other CI tool

## Docker

Docker Images can be used to run the framework against headless chrome using the following command.

Note: The server address rather than localhost:5000 is required to run in docker

`docker run -it -v $PWD:/e2e -w /e2e cypress/included:6.8.0 --config baseUrl=http://172.17.0.2:5000 --browser chrome --headless`

## Edge Cases

Edge cases have been included within the feature files.

- Negative Cases - Filtering.feature
- SQL Injection - Filtering.feature
- Cross Site Scripting - Filtering.feature
- Accessibility - Added to ./common/app-steps.

I would plan to utilize redux store manipulation further to test scenarios for example:

- Very long names or cities. How does the UI handle this?
- Large amounts of crew members. How does the app loading times increase and UI respond?

I would utilize a module like [faker](https://github.com/marak/Faker.js/) to help building the mocked objects.

## Performance

In cypress.io best practices it mentions that cypress is not geared towards performance testing. 
https://docs.cypress.io/guides/references/trade-offs#Automation-restrictions


I had a look at the cypress lighthouse audit plugin, however I ran into issues running against the local app. Please see notes in .cypress/integration/common/app-steps. This would be a good tool for getting page loading measurements but not useful for measuring interactions like moving cards or filtering.


Another plugin I looked at was https://github.com/bahmutov/cypress-timings. This logs the timing of cypress events when you select them in the cypress UI into the devtools console. Useful for debugging but not something that can be added into the tests.


For a custom solution it may be possible to hook into the plugins logic and add a timer to track timings  before and after a task or action completes.


Failing that, it may possible to instrument the app code to produce some timing metrics and capture this from the console during test runs. 

## Linting

I used the same air-bnb eslint linting as the oss-ca app to keep the coding consistent between app and test framework.

I find this can be useful for both Developers and QA. Normally I would also add prettier in as well.

eslint is v5 in the oss app, so I kept it as that in the test repo for now even though v7 is available. In a real testing situation I'd discuss with the development team to see if we can upgrade both.

To run linting `yarn run lint`
To run linting and fix issues `yarn run lint-fix`

## Implementation Notes

### Cucumber

This is the first time I have used Cucumber in conjunction with Cypress. I found the [plugin](https://www.npmjs.com/package/cypress-cucumber-preprocessor) setup relatively intuitive compared to other tools.


I have tagged the scenarios in order to allow different combinations to be executed using -e TAGS='@tagName'.

### BDD

BDD Scenarios are meant to be a collaborative effort prior to the features being delivered, so I did my best to retrofit them to the example application state in this instance.

### Assumptions

When creating the tests based on the provided instructions, I assumed the current behaviour was desired. On a real app these are likely future enhancements or defects.

- There is no responsive shifting of elements for smaller viewport
- Filtering was case sensitive
- There should be a means to reject a crew member rather than leaving them as applied.
- Accessibility issues

### Browsers

Tests are passing against

- Electron
- Chrome (ui and headless)
- Firefox

I set the default viewport to one of the most popular ones. Reference https://gs.statcounter.com/screen-resolution-stats

Internal metrics would be used to tailor it towards a particular customer base.

```
"viewportWidth": 1920,
"viewportHeight": 1080
```

The most popular mobile browser viewport is width 360 x height 640. I added an additional script to run with that viewport.

`yarn run test-mobile-width-360`

### Unique attributes

There were some complications when it came to targeting elements due to the lack of good locators. I would work to have development add unique data-marker attributes into the related components. One example is on the CrewMember cards where 'name' and 'city' are both just separate divs under

### Yarn

I used yarn rather than npm to match the oos-ca application repo.

I noticed the cypress documentation suggests npm may be better suited to ci for cypress.
yarn.lock has been committed to keep the dependancies on a stable version. This can be important for CI as you don't want a bug in a newer version of one of the dependancies potentially breaking during deployment testing.

### Cypress Version

Cypress v7.0 has just come out in the last few days, but I haven't updated to that version until it stabilizes.

This project is using the most recent 6.8 version.

### Custom Commands

As the functionality and test data is limited here I did not create any custom cypress commands. With additional functionality and tests I would start to do that.
