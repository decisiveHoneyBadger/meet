# Meet App

This app was designed to offer users the opportunity to find out any events taking place in their locations based on the Google Calender API.

## Feature 2: Show/hide event details

### Scenario 1: Collapsed by default

- Given user is on the main page
- When nothing is selected
- Then the event details will be collapsed

### Scenario 2: Expanding the details

- Given user wants to see more about an event
- When user clicks a show more button
- Then the details will expand for that event

### Scenario 3: Collapse the details

- Given user has seen the details and wants to collapse it (close)
- When user clicks on the collapsing details
- Then the details will collapse again (like in Scenario 1)

## Feature 3: Specify number of events

### Scenario 1: No number is specified

- Given user has not specified a preference
- When user visits the page
- Then a default of 32 events will be displayed

## Scenario 2: User has specified event count preference

- Given user has chosen an event count preference
- When user visits the page
- Then the specified count of events will be displayed

## Feature 4: Use App even when being offline

### Scenario 1: Show cached data when being offline

- Given user does not have internet access
- When they still access the site
- Then the data will be accessible and visible

### Scenario 2: Show error if user tries to change the location

- Given user does not have internet access
- When usern wants to change the location/information
- Then an error will be displayed

### Feature 5: Data Visualization

### Scenario 1: Show a chart with a number of events

- Given user has been on the main page
- When user want to see upcoming events
- Then user will see a chart with upcoming events
