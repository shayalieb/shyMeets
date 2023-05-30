![Alt text](src/img/Large%20Screenshot.PNG)

<h1>shyMeets Overview:</h1>
<p>
shyMeets App is designed to help users manage all of their events that take place in various cities around the world. The app uses serverless functionality from Google OAuth, and Amazon AWS Lambda. This allows for maximum security for the user, while also performing key backend functions. This is a a PWA (Progressive Web App) which can easily be installed on the users mobile device, desktop, or in browser, regardless of the type of device (Apple vs Android...)
</p>
</br>
<h1>Serverless Functionality:</h1>
<p>
The app uses Amazon AWS Lambda for performing key functions in the backend, such as performing verification functions like receiving access token, getting events and so on.
Google OAuth 2 is used as a basis for verifying users by their perspective Google accounts, allowing for added security, and not needing to create all the verifications functions that can be very time consuming.
</p>
<ul>
    <h1>Technologies used in thi app:</h1>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li> 
    <li>React</li>
</ul>    
<br>
<h1>User story:</h1>
<p>The user of this app will have the ability to track multiple events that will take place in the city
where the user is currently located in.
</p>    
<br>
<ul>
    <h1>App Road map</h1>
    <li>Default: The user has not searched for any specific city</li>
    <li>Searching: When searching by city, the user should see a list of suggested cities</li>
    <li>City selection: The user should choose a city from the suggested cities</li>
    <li>Local events: The user should see all events in that city</li>
    <li> Event details: Show or hide event details</li>
    <li>Use offline: Caching data to allow for offline app usage</li>
    <li> Homepage: Show all events</li>
    <li>Events by city: Search events by the city in the search box</li>
    <li>The default number of events: The default number to show at once is 32</li>
    <li>User input for default number: The user can set the number of events to show at once</li>
</ul>
<ul>
    <h1>Scenario road map:</h1>
    <li>As a [role]</li>
    <li>I should be able to [action]</li>
    <li>So that [benefit]</li>
    <ul>
        <li>Given</li>
        <li>When</li>
        <li>Then</li>
    </ul>
</ul>    

<ul>
    <h2>Scenario 1: What the user should expect</h2>
    <li>As a user: I should have the ability to manage the events that will be taking place in a given city</li>
    <li>I should be able to: Filter events by city</li>
    <li>So that: I can see a list of events that will take place in that city</li>
    <ul>
        <li>Given: When the app opens and is loaded</li>
        <li>When: The user has not made any searches yet</li>
        <li>Then: The user should see a list of all events</li>
    </ul>
</ul>
<ul>
    <h2>Scenario 2: Event suggestions</h2>
    <li>As a user: I would like to see a list of suggested cities to choose from</li>
    <li>I should be able to: Have the ability to type a city into the search box</li>
    <li>So that: I can see a list of suggested events in my city</li>
    <ul>    
        <li>Given: Show a list of cities and a search box</li>
        <li>When: The user starts typing in the search box</li>
        <li>Then: Show a list of suggestions should appear matching what is being typed in the search box</li>
        </ul>
</ul>        
<h2>Scenario 3: Select a city from the suggested</h2>
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
<ul>
    <h2>Scenario 4: Event details</h2>
    <li>As a user: When viewing event details</li>
    <li>I should be able to: Show and hide event details</li>
    <li>So that: I can view one event at a time eliminating clutter</li>
    <ul>
        <li>Given: Open event details</li>
        <li>When: When the user chooses to open event details</li>
        <li>Then: When the user chooses, close event details</li>
    </ul>
</ul>    
<ul>
    <h2>Scenario 5: Show only 32 events at once unless the user specifies a number</h2>
    <li>As a user: I do not want to see too many events at once unless I specify</li>
    <li>I should be able to: Either see 32 events at once or specify a certain number
    <li>So that: I can manage how many events I see at once making it more streamlined</li>
    <ul>
        <li>Given: View default of 32 events at a time</li>
        <li>When: The user specifies the number of events to show at one time</li>
        <li>Then: Show the specified (or default if no number is specified) number of events</li>
    </ul>
</ul>   
<ul>
<h2>Scenario 6: Not needing an internet connection to use the app.
    <li>As a user: I would like to use this app offline</li>
    <li>I should be able to: View my events when there is no internet connection</li>
    <li>So that: I can view my events even when there is no internet connection</li>
    <ul>    
        <li>Given: Cache all data in local storage</li>
        <li>When: The app is loaded, store all data locally</li>
        <li>Then: The app will function when offline or with no internet connection</li>
    </ul>
</ul>        
<ul>    
    <h2>Scenario 7: Manually adding or removing an event</h2>
    <li>As a user: I would like to add or remove an event</li>
    <li>I should be able to: Add or remove an event with its details</li>
    <li>So that: I can add events that are not on the app's events list yet, and remove events that are not important to me</li>
    <ul>    
        <li>Given: Add or remove the event</li>
        <li>When: Adding events, input all details, and when removing an event remove all details from my cache</li>
        <li>Then: The app will add or remove all my necessary event data</li>
        </ul>
    </ul>        
