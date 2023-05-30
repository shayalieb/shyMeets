![Alt text](src/img/Large%20Screenshot.PNG)

shyMeets Overview:
shyMeets App is designed to help users manage all of their events that take place in various cities around the world. The app uses serverless functionality from Google OAuth, and Amazon AWS Lambda. This allows for maximum security for the user, while also performing key backend functions. This is a a PWA (Progressive Web App) which can easily be installed on the users mobile device, desktop, or in browser, regardless of the type of device (Apple vs Android...)

Serverless Functionality:
The app uses Amazon AWS Lambda for performing key functions in the backend, such as performing verification functions like receiving access token, getting events and so on.
Google OAuth 2 is used as a basis for verifying users by their perspective Google accounts, allowing for added security, and not needing to create all the verifications functions that can be very time consuming.

Technologies used in thi app:
HTML
CSS
JavaScript 
React

User story:
The user of this app will have the ability to track multiple events that will take place in the city
where the user is currently located in.
App Road map
● Default: The user has not searched for any specific city.
● Searching: When searching by city, the user should see a list of suggested cities.
● City selection: The user should choose a city from the suggested cities
● Local events: The user should see all events in that city
● Event details: Show or hide event details
● Use offline: Caching data to allow for offline app usage
● Homepage: Show all events.
● Events by city: Search events by the city in the search box.
● The default number of events: The default number to show at once is 20.
● User input for default number: The user can set the number of events to show at once.
● Events: Manually add or remove event
    Event details:
        ○ Event poster
        ○ Event name
        ○ Event date
        ○ Event description
        ○ Address
        ○ City
        ○ State/Province
        ○ Address 1
        ○ Address 2
        ○ Postal code

Scenario road map:
    ● As a [role],
    ● I should be able to [action]
    ● So that [benefit]
        ○ Given
        ○ When
        ○ Then

Scenario 1: What the user should expect.
    ● As a user: I should have the ability to manage the events that will be taking place in a given city.
    ● I should be able to: Filter events by city.
    ● So that: I can see a list of events that will take place in that city.
        ○ Given: When the app opens and is loaded.
        ○ When: The user has not made any searches yet.
        ○ Then: The user should see a list of all events.

Scenario 2: Event suggestions.
    ● As a user: I would like to see a list of suggested cities to choose from.
    ● I should be able to: Have the ability to type a city into the search box.
    ● So that: I can see a list of suggested events in my city.
        ○ Given: Show a list of cities and a search box.
        ○ When: The user starts typing in the search box.
        ○ Then: Show a list of suggestions should appear matching what is being typed in the search box.

Scenario 3: Select a city from the suggested.
    ● As a user: Once I choose my desired city.
    ● I should be able to: View all events that are taking place in that city.
    ● So that: I can choose my desired event.
        ○ Given: View the default number of events in that city.
        ○ When: The user chooses an event in that city
        ○ Then: Show event details

Scenario 4: Event details.
    ● As a user: When viewing event details.
    ● I should be able to: Show and hide event details.
    ● So that: I can view one event at a time eliminating clutter.
        ○ Given: Open event details.
        ○ When: When the user chooses to open event details.
        ○ Then: When the user chooses, close event details.

Scenario 5: Show only 20 events at once unless the user specifies a number.
    ● As a user: I do not want to see too many events at once unless I specify.
    ● I should be able to: Either see 20 events at once or specify a certain number.
    ● So that: I can manage how many events I see at once making it more streamlined.
        ○ Given: View default of 20 events at a time.
        ○ When: The user specifies the number of events to show at one time
        ○ Then: Show the specified (or default if no number is specified) number of events

Scenario 6: Not needing an internet connection to use the app.
    ● As a user: I would like to use this app offline.
    ● I should be able to: View my events when there is no internet connection.
    ● So that: I can view my events even when there is no internet connection.
        ○ Given: Cache all data in local storage
        ○ When: The app is loaded, store all data locally
        ○ Then: The app will function when offline or with no internet connection

Scenario 7: Manually adding or removing an event
    ● As a user: I would like to add or remove an event.
    ● I should be able to: Add or remove an event with its details.
    ● So that: I can add events that are not on the app's events list yet, and remove events that are not important to me.
        ○ Given: Add or remove the event
        ○ When: Adding events, input all details, and when removing an event remove all details from my cache
        ○ Then: The app will add or remove all my necessary event data
