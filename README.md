# Meet App

This app was designed to offer users the opportunity to find out any events taking place in their locations based on the Google Calender API.

## Feature 2: Show/hide event's details

### Scenario 1: Collapsed by default

- Given the main page has been loaded
- When the user does not selected anything
- Then the event details will be collapsed

### Scenario 2: Expanding the details

- Given the list of events has been loaded
- When the user clicks on that specific event
- Then the details will expand for that event

### Scenario 3: Collapse the details

- Given the details are expanded
- When the user clicks on the expanded details
- Then the details will collapse again

## Feature 3: Specify number of events

As a user I should have the option to choose the number of events I want to see

### Scenario 1: No number is specified

- Given the number of events is empty
- When the user loads the page
- Then a default of 32 events will be displayed

## Scenario 2: User has specified event count preference

- Given the number of events has been set
- When the user loads the page
- Then the specified count of events will be displayed

## Feature 4: Use the App when offline

As a user I want to be able to access events even when being offline

### Scenario 1: Show cached data when being offline

- Given the app has no internet access
- When the user loads the page
- Then the cached data will be accessible and visible

### Scenario 2: Show error when user tries to change the location

- Given the app has no internet access
- When the user changes the location/information
- Then an error will be displayed

### Feature 5: Data Visualization

As a user I want to see the charts with the number of upcoming events in each city

### Scenario 1: Show a chart with a number of upcoming events in each city

- Given the main page has been loaded
- When the user clicks on upcoming events
- Then a chart with upcoming events will be displayed
