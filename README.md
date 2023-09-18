# shyMeets Overview:

![Main image](src/img/Large%20Screenshot.PNG)

shyMeets App is designed to help users manage all of their events that take place in various cities around the world. The app uses serverless functionality from Google OAuth, and Amazon AWS Lambda. This allows for maximum security for the user, while also performing key backend functions. This is a a PWA (Progressive Web App) which can easily be installed on the users mobile device, desktop, or in browser, regardless of the type of device (Apple vs Android...)

## Serverless Functionality:

The app uses Amazon AWS Lambda for performing key functions in the backend, such as performing verification functions like receiving access token, getting events and so on.
Google OAuth 2 is used as a basis for verifying users by their perspective Google accounts, allowing for added security, and not needing to create all the verifications functions that can be very time consuming.

## Technologies used in thi app:
-React
-JavaScript
-CSS
-HTML

Serverless function:
-AWS Lambda for setting backend function
-Google OAuth for authentication

## Installation instruction 

Note: This is designed to work on Google devices only
-Open chrome
-Go navigate to https://shayalieb.github.io/shyMeets/
-On the top right (by the vertical three dots)
-Click "More Tools
-Enter the name for the short cut and click create

# App Road map

## User is taken to the home page to sign in using Google OAuth 
![Home page image](src/img/home-page.jpg)

## Once logged in the user will see a list of events 
![List of events](src/img/list%20of%20events.jpg)

## User can search events by city or all cities
![City search](src/img/search-by-city.jpg)

## On the bottom of the page the user can select the number of events to show
![Number of events](src/img/number-of-events.jpg)

## User can view a chart with the event type
![Event chart](src/img/events-type-chart.jpg)

## User show or hide event details, as well as a link to the actual Google calendar event
![show hide event details](src/img/event-details-calendar-link.jpg)

# User stories
Scenario road map:
<ul>
    <li>As a [role] (Given)</li>
    <li>I should be able to [action] (When)</li>
    <li>So that [benefit] (Then)</li>
    </ul>
<ul>

## Scenario 1: What the user should expect
<ul>
<li>As a user: I should have the ability to manage the events that will be taking place in a given city</li>
<li>I should be able to: Filter events by city</li>
<li>So that: I can see a list of events that will take place in that city</li>
</ul>
<ul>
        <li>Given: When the app opens and is loaded</li>
        <li>When: The user has not made any searches yet</li>
        <li>Then: The user should see a list of all events</li>
    </ul>
## Scenario 2: Event suggestions

<li>As a user: I would like to see a list of suggested cities to choose from</li>
    <li>I should be able to: Have the ability to type a city into the search box</li>
    <li>So that: I can see a list of suggested events in my city</li>
    <ul>    
        <li>Given: Show a list of cities and a search box</li>
        <li>When: The user starts typing in the search box</li>
        <li>Then: Show a list of suggestions should appear matching what is being typed in the search box</li>
        </ul>
</ul>   

## Scenario 3: Select a city from the suggested
<ul>
    <li>As a user: Once I choose my desired city</li>
    <li>I should be able to: View all events that are taking place in that city</li>
    <li>So that: I can choose my desired event</li>
    <ul>
        <li>Given: View the default number of events in that city</li>
        <li>When: The user chooses an event in that city</li>
        <li>Then: Show event details</li>
    </ul>
</ul>    

## Scenario 4: Event details
<uL>
<li>As a user: When viewing event details</li>
    <li>I should be able to: Show and hide event details</li>
    <li>So that: I can view one event at a time eliminating clutter</li>
   </ul>
    <ul>
        <li>Given: Open event details</li>
        <li>When: When the user chooses to open event details</li>
        <li>Then: When the user chooses, close event details</li>
    </ul>
</ul>    

## Scenario 5: Show only 32 events at once unless the user specifies a number
<ul>
<li>As a user: I do not want to see too many events at once unless I specify</li>
    <li>I should be able to: Either see 32 events at once or specify a certain number
    <li>So that: I can manage how many events I see at once making it more streamlined</li>
       </ul>
    <ul>
        <li>Given: View default of 32 events at a time</li>
        <li>When: The user specifies the number of events to show at one time</li>
        <li>Then: Show the specified (or default if no number is specified) number of events</li>
 </ul>   

## Scenario 6: Not needing an internet connection to use the app
<ul>
 <li>As a user: I would like to use this app offline</li>
    <li>I should be able to: View my events when there is no internet connection</li>
    <li>So that: I can view my events even when there is no internet connection</li>
</ul>
<ul>
<li>Given: Cache all data in local storage</li>
        <li>When: The app is loaded, store all data locally</li>
        <li>Then: The app will function when offline or with no internet connection</li>
    </ul>
</ul>

## Scenario 7: Manually adding or removing an event
<ul>
 <li>As a user: I would like to add or remove an event</li>
    <li>I should be able to: Add or remove an event with its details</li>
    <li>So that: I can add events that are not on the app's events list yet, and remove events that are not important to me</li>
</ul>
<ul>
<li>Given: Add or remove the event</li>
        <li>When: Adding events, input all details, and when removing an event remove all details from my cache</li>
        <li>Then: The app will add or remove all my necessary event data</li>
</ul>

