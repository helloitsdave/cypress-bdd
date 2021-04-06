Feature: Mocked Redux Example
    
    As a Tester
    I want to be able to mock the Crew Studio Data
    So I can easily manipulate the data required for testing

    Background: 
        Given The Application is loaded
        And The Application is using mocked crew applicants

    @Mocked
    Scenario: Crew Studio Loads with 3 Applied Applications
        When I view the 'Applied' Applications
        Then I get '3' 'Applied' Applicants

    @Mocked
    Scenario: Crew Studio Loads with 3 Hired Applications
        When I view the 'Hired' Applications
        Then I get '3' 'Hired' Applicants

    @Mocked
    Scenario: Crew Studio Loads with 3 Interviewing Applications
        When I view the 'Hired' Applications
        Then I get '3' 'Hired' Applicants