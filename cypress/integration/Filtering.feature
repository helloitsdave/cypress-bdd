Feature: Filtering

    As a Crew Manager
    I want to be able to filter applicants by Name and City
    So I can locate the records of applicants I want to review

    Background:
        Given The Application is loaded
        And The Filter is cleared

    @filtering
    Scenario Outline: Filter Applicants By Name. <scenarioDetail>
        When I filter by the name <name>
        Then  <resultCount> results are returned
        And Only results which match the name <name> are returned

        Examples:
            | name         | resultCount | scenarioDetail                     |
            | 'julia'      | '1'         | 'Firstname - Single Match'         |
            | 'cunningham' | '1'         | 'Surname - Single Match'           |
            | 'a'          | '5'         | 'Single Character - Five Matches'  |
            | 'm'          | '3'         | 'Single Character - Three Matches' |

    @filtering
    Scenario Outline: Filter Applicants By City. <scenarioDetail>
        When I filter by a city <city>
        Then <resultCount> results are returned
        And Only results which match the city <city> are returned

        Examples:
            | city        | resultCount | scenarioDetail                     |
            | 'sheffield' | '1'         | 'City - Single Match'              |
            | 'o'         | '3'         | 'Single Character - Three Matches' |
            | 'ff'        | '2'         | 'Two Characters - Two Matches'     |

    @filtering
    Scenario Outline: Filter Applicants By City and Name. <scenarioDetail>
        When I filter by a city <city>
        And I filter by the name <name>
        Then <resultCount> results are returned
        And Only results which match the city <city> and <name> are returned


        Examples:
            | city      | name       | resultCount | scenarioDetail                 |
            | 'cardiff' | 'danielle' | '1'         | 'City and Name - Single Match' |

    @filtering
    Scenario: All Applicants re-appear when the filter is cleared
        Given I filter by the name 'julia'
        When The Filter is cleared
        Then '5' results are returned

    @filter @negative
    Scenario Outline: Negative Checks - Filter Applicants By Name. <scenarioDetail>
        When I filter by the name <name>
        Then '0' results are returned

        Examples:
            | name                             | scenarioDetail                                       |
            | 'Julia'                          | 'Upper Case Firstname - No Match'                    |
            | 'julia cunningham'               | 'Full Name - No Match - Seems like a bug/limitation' |
            | 'julia?'                         | 'Firstname with special character at end - No Match  |
            | '1'                              | 'Number - No Match                                   |
            | 'brian'                          | 'Non existing name - No Match                        |
            | 'liverpool'                      | 'City rather than name - No Match                    |
            | ' '                              | 'Empty String Search - No Matches'                   |
            | '"<script>alert("xss")</script>' | 'XSS String - No Match'                              |


    @filter @negative
    Scenario Outline: Negative Checks - Filter Applicants By City. <scenarioDetail>
        When I filter by a city <city>
        Then '0' results are returned

        Examples:
            | city               | scenarioDetail                     |
            | 'LIVERPOOL'        | 'Upper Case - No Match'            |
            | 'sheff field'      | 'Space in City - No Match          |
            | 'julia'            | 'Name rather than City - No Match  |
            | '姓名'             | 'Double Byte - No Match            |
            | ' '                | 'Empty String Search - No Matches' |
            | "julia' or '1'='1" | 'SQL Injection - No Match'         |