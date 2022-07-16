Feature: SPECIFY NUMBER OF EVENTS

    Scenario: When the user hasn't specified a number of events, 32 is the default number.
        Given the user is on the main page of the app
        When the user hasn't specified a number of events
        Then the default number of displayed events will be 32

    Scenario: User can change the number of events they want to see.
        Given the user is on the main page
        When the user sets a number of events and he/she wants to see in the “Number of events” box
        Then this number of events will be displayed