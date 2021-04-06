Feature: App Initial State On Loading

    As a Crew Manager 
    I want to be able to load the Crew Studio
    So I can view the current status of applicants

    Background: 
        Given The Application is loaded

    Scenario: Crew Studio Loads with the expected components
        Then I see the Application Header
        Then I see the Applied, Interviewing and Hired Sections

    Scenario: Crew Studio Loads with 4 Applied Applications
        When I view the 'Applied' Applications
        Then I get '4' 'Applied' Applicants

    Scenario: Crew Studio Loads with 1 Hired Application
        When I view the 'Hired' Applications
        Then I get '1' 'Hired' Applicants

    Scenario: Crew Studio Loads with no Interviewing Applications
        Then I get no 'Interviewing' Applicants

    Scenario: Crew Member Cards should contain a name
        When I view the Applicants
        Then I should see the name of each applicant

    Scenario: Crew Member Cards should contain a city
        When I view the Applicants
        Then I should see the city of each applicant

    Scenario: Crew Member Cards should contain a picture
        When I view the Applicants
        Then I should see a picture of each applicant
