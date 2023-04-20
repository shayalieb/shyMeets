Feature: Filter events by city

        Scenario: When the user has not searched for a city, show events in all cities
            Given user has not searched for any city
             When the user opens the App
             Then the user should see the list of all events in all cities

        Scenario: User should see a list of suggested cities
            Given the main page is opens
             When the user starts typing in the search box
             Then the user should receive a list of suggested cities

        Scenario: User can select a city from the suggestion list
            Given the user was typing in Miami FL in the text box
              And the list of suggested cities is showing
             When the user selects a city from the list
             Then the city should change to the selected city
              And the user should get a list of all events in that suggested city
