# lab-06-back-end
# City Explorer Back-End

**Author**: [Manish](https://github.com/jManij) and [BomiBear](https://github.com/bomibear)
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

**Time Estimates**:
Number and name of feature: Location and Weather

Estimate of time needed to complete: 2 hours

Start time: 9.30 am

Finish time: 1.30 pm

Actual time needed to complete: 3 hours

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
This application will serve as a backend to user requests on exploring city


## Getting Started
In order to run this locally, follow these steps after cloning the repo:
```
npm install dotenv
npm install cors
```
Open the code in your favorite editor and create a new file called ```.env``` at the root level. In there specify the PORT that you want the application to run on, like ```PORT=3000```.  Within terminal, type in ```nodemon``` to run the server.

Head over to Google and grab a Google Maps API Key.  Enable the Google Maps Static API.  Afterwards, head to the [front end of the application](https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/).  Put in the Google Maps API key, and use this address for the url ```https://citylookup.herokuapp.com```.

## Architecture
This application currently runs with provided JSON data that is stored in the data folder.  A Google API key is used for the front end portal. The server is hosted on Heroku

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

07-09-2019 - Application now has a fully-functional express server, with a GET route for the location resource.-->

## Credits and Collaborations
[Manish](https://github.com/jManij) and [BomiBear](https://github.com/bomibear) worked on the first day of this project.