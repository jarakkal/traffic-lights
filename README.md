# traffic-lights 

Simulating a set of traffic lights at an intersection

## Requirements

The traffic lights are designated (N, S) and (E, W) like a compass.

When switching from green to red, the yellow light must be displayed for 30 seconds prior to it switching to red and the opposite direction switching to green from red.

The lights will change automatically every 5 minutes.

Provide the output for the light changes which occur during the period 9am and 9:30am.

## Install Procedure

You need Node.js and npm. 


## Dependencies
    "assert": "^1.4.1",
    "body-parser": "^1.15.2",
    "chai": "^3.5.0",
    "expect": "^1.20.2",
    "express": "^5.0.0-alpha.2",
    "mocha": "^3.1.2",
    "nunjucks": "^2.5.2",
    "request": "^2.75.0",
    "socket.io": "^1.5.0",
    "sqlite3": "^3.1.6"

## Testing

`npm test`, to run tests defined in the test folder.


## Execution

1. Click on the 'Start traffic control' button to start.
2. Click on 'Get traffic info between 09:00:00 and 09:30:00' to see the output if any.
