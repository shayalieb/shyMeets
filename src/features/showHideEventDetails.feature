Feature: Show or hide event details

        Scenario: event element is collapsed by default
            Given the user has not selected a location
             When the app is opened but there is no action yet
             Then all events should be hidden by default

        Scenario: The user can expand event details by clicking show details
            Given the user has selected an event
             When the user clicks on the show details button
             Then event details should be displayed

        Scenario: User can collapse and hide event details
            Given the user is done with viewing the event
             When the user clicks hide details button
             Then the details should be collapsed nad hidden