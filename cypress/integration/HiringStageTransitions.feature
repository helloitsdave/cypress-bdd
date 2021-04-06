Feature: Applicant Transitions
    
    As a Crew Manager 
    I want to be able to move applicants between different application states
    So I can view and modify the current state of a crew application

    Background: 
        Given The Application is loaded

    @states
    Scenario Outline: Move Applicant from Applied -> Interviewing
        Given The applicant <name> has a status of Applied
        When I move <name> from Applied to Interviewing
        Then The applicant <name> has a status of Interviewing

        Examples:
            | name | 
            | 'danielle moore' | 

    @states
    Scenario Outline: Move Applicant from Hired -> Interviewing   
        Given The applicant <name> has a status of Hired
        When I move <name> from Hired to Interviewing
        Then The applicant <name> has a status of Interviewing

        Examples:
            | name | 
            | 'julia cunningham' | 

    
    @states
    Scenario Outline: Move Applicant from Applied -> Interviewing -> Hired
        Given The applicant <name> has a status of Applied
        When I move <name> from Applied to Interviewing
        And I move <name> from Interviewing to Hired
        Then The applicant <name> has a status of Hired

        Examples:
            | name | 
            | 'emma stewart' | 

  
    @states
    Scenario Outline: Move Applicant from Hired -> Interviewing -> Applied  
        Given The applicant <name> has a status of Hired
        When I move <name> from Hired to Interviewing
        And I move <name> from Interviewing to Applied
        Then The applicant <name> has a status of Applied
        When I view the 'Applied' Applications
        Then I get '5' 'Applied' Applicants

        Examples:
            | name | 
            | 'julia cunningham' | 

    
    @states
    Scenario Outline: After Filtering Move Applicant from Hired -> Interviewing  
        When I filter by a city <city>
        And I move <name> from Hired to Interviewing
        And I view the 'Interviewing' Applications
        Then I get '1' 'Interviewing' Applicants
        And The applicant <name> has a status of Interviewing
        When The Filter is cleared
        Then The applicant <name> has a status of Interviewing

        Examples:
            | name | city |
            | 'julia cunningham' | 'sheffield' |