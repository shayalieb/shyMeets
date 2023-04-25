Feature: Specify the number of events

        Scenario: When the user has not specified a number of events, the default should be 32
            Given the user has not specified a number of events
             When selecting all events or specific city
             Then 32 should be the default number of events

        Scenario: The user can change the number of events shown
            Given the user does not want to view all events
             When the user changes the number of events in the input box
             Then the user changes the number of events to its desired number