'use strict';

// APP dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Global vars
const PORT = process.env.PORT;

// Make my server
const app = express();
app.use(cors());

/********* Constructor for response to client*****/

//Weather Constructor
function Weather(forecast, time) {
  this.forecast = forecast;
  this.time = time;
}

//Location Constructor
function Location(query, formatted_query, lat, long) {
  this.search_query = query;
  this.formatted_query = formatted_query;
  this.latitude = lat;
  this.longitude = long;
}

/**************************************************/

/* Routes requested by clients */

//Route for location
app.get('/location', (request, response) => {
  try {
    const locationData = searchToLatLng(request.query.data);
    response.send(locationData);
  } catch (e) {
    handleError(e, response);
  }
})

//Route for weather
app.get('/weather', (request, response) => {
  try {
    const weatherData = weatherForecast(request.query.data);
    response.send(weatherData);
  } catch (e) {
    handleError(e, response);
  }
})

app.use('*', (request, response) => {
  response.send('you got to the wrong place');
})

//Returns the array of weather object to the request
function weatherForecast() {
  //array of weather objects
  const arrayOfWeather = [];
  const darkSkyData = require('./data/darksky.json');
  darkSkyData.daily.data.forEach(item => {
    arrayOfWeather.push(new Weather(item.summary, new Date(item.time * 1000).toDateString()));
  })
  return arrayOfWeather;
}

//Returns the location of the request
function searchToLatLng(locationName) {
  const geoData = require('./data/geo.json');
  return (new Location(locationName, geoData.results[0].formatted_address,
    geoData.results[0].geometry.location.lat,
    geoData.results[0].geometry.location.lng));

}

//Error handling function
function handleError(error, response) {
  console.log('Error: ', error);
  response.status(500).send('Status 500: Error occured! Refer to the log for more information');
}

// Start the server
app.listen(PORT, () => {
  console.log(`Our app is up on port ${PORT}`)
})
