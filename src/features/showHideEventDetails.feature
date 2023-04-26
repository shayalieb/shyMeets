Feature: Show or hide event details

        Scenario: the user has not opened or interacted with the app yet
            Given the user has not selected a city
             When the user opens the app with no interaction yet
             Then all events are shown but details collapsed

        Scenario: the event details will expand
            Give the user selects an event
             When the user clicks the see more details button
             Then the event details will expand

        Scenario: User can collapse an event and hide its details
            Given the user has seen the details
             When the user clicks the hide details button
             Then the details page will collapse and be hidden
