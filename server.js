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

/*
$.ajax({
    url: `localhost:3000/location`,
    method: 'GET',
    data: { data: searchQuery }
  })
*/

// app.get('/location') is a route
app.get('/location', (request, response) => {
  // response.send('hello world you are on the location path');
  console.log(request.query.data);
  try {
    const locationData = searchToLatLng(request.query.data);
    response.send(locationData);
  } catch(e){
    response.status(500).send('Status 500: So sorry i broke')
  }
})

app.use('*', (request, response) => {
  response.send('you got to the wrong place');
})


function searchToLatLng (locationName){
  const geoData = require('./data/geo.json');
  const location = {
    search_query: locationName,
    formatted_query: geoData.results[0].formatted_address,
    latitude: geoData.results[0].geometry.location.lat,
    longitude: geoData.results[0].geometry.location.lng,
  }
  return location;
}



// Start the server
app.listen(PORT, () => {
  console.log(`Our app is up on port ${PORT}`)
})

