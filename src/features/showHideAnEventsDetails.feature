Feature: SHOW/HIDE AN EVENT'S DETAILS

    Scenario: An event element is collapsed by default.
        Given the user is on the main page of the app
        When an event is displayed
        Then the event details will be collapsed.

    Scenario: User can expand an event to see its details
        Given the user gets displayed a list of events
        When the user clicks on a single event
        Then the event details will be collapsed

    Scenario: User can collapse an event to hide its details
        Given the user has clicked on a single event to get its details displayed
        When the user clicks on the "hide details" button
        Then the event details will hide