Feature: App Initial State On Loading

    As a Crew Manager 
    I want to be able to load the Crew Studio
    So I can view the current status of applicants

    Background: 
        Given The Application is loaded

    @defaults
    Scenario: Crew Studio Loads with the Application Header
        Then I see the Application Header

    @defaults
    Scenario: Crew Studio Loads with the Applied, Interviewing and Hired Sections
        Then I see the Applied, Interviewing and Hired Sections

    @defaults
    Scenario: Crew Studio Loads with the filters
        Then I see the Filters

    @defaults
    Scenario: Crew Studio Loads with 4 Applied Applications
        When I view the 'Applied' Applications
        Then I get '4' 'Applied' Applicants

    @defaults
    Scenario: Crew Studio Loads with 1 Hired Application
        When I view the 'Hired' Applications
        Then I get '1' 'Hired' Applicants

    @defaults
    Scenario: Crew Studio Loads with no Interviewing Applications
        Then I get no 'Interviewing' Applicants

    @defaults
    Scenario: Crew Member Cards should contain a name
        When I view the Applicants
        Then I should see the name of each applicant

    @defaults
    Scenario: Crew Member Cards should contain a city
        When I view the Applicants
        Then I should see the city of each applicant

    @defaults
    Scenario: Crew Member Cards should contain a picture
        When I view the Applicants
        Then I should see a picture of each applicant

    @defaults
    Scenario: Crew Member Cards In Applied do not have the move left button
        Then The Applied Appliants should not have a move left button
    
    @defaults
    Scenario: Crew Member Cards In Hired do not have the move right button
        Then The Hired Appliants should not have a move right button