'use strict';

// first run npm init from the terminal to create "package.json"
// `npm install dotenv` installs the dotenv module into the node module folder
// loads our environment from a secret .env file

// APP dependencies
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Global vars
const PORT = process.env.PORT;
// Make my server
const app = express();
app.use(cors());

// app.get('/location') is a route
app.get('/location', (request, response) => {
  try {
    const locationData = searchToLatLng(request.query.data);
    response.send(locationData);
  } catch (e) {
    response.status(500).send('Status 500: So sorry i broke')
  }
})

//Route for weather
app.get('/weather', (request, response) => {
  try {
    const weatherData = weatherForecast(request.query.data);
    response.send(weatherData);
  } catch (e) {
    response.status(500).send('Status 500: Sorry I broke while finding weather data');
  }
})

app.use('*', (request, response) => {
  response.send('you got to the wrong place');
})

function weatherForecast() {
  //Constructor for weather data
  const weather = [];
  const darkSkyData = require('./data/darksky.json');
  darkSkyData.daily.data.forEach(item => {
    let obj = {
      forecast: item.summary,
      time: new Date(item.time * 1000).toDateString()
    }
    weather.push(obj);
  })
  return weather;
}

function searchToLatLng(locationName) {
  const geoData = require('./data/geo.json');
  const location = {
    search_query: locationName,
    formatted_query: geoData.results[0].formatted_address,
    latitude: geoData.results[0].geometry.location.lat,
    longitude: geoData.results[0].geometry.location.lng
  }
  return location;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Our app is up on port ${PORT}`)
})
