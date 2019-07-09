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
console.log(process.env.manish);

// Make my server
const app = express();
app.use(cors());


// $.ajax({
//   url: `localhost:3000/location`,
//   method: 'GET',
//   data: { data: searchQuery }
// })


// app.get('/location') is a route
app.get('/location', (request, response) => {
  // response.send('hello world you are on the location path');
  console.log(request.query.data);
  try {
    const locationData = searchToLatLng(request.query.data);
    response.send(locationData);
  } catch (e) {
    response.status(500).send('Status 500: So sorry i broke')
  }
})

//Route for weather
app.get('/weather', (request, response) => {
  try{
    const weatherData = weatherForecast(request.query.data);
    response.send(weatherData);
  } catch(e) {
    response.status(500).send('Status 500: Sorry I broke while finding weather data');
  }
})


app.use('*', (request, response) => {
  response.send('you got to the wrong place');
})



//Constructor for weather data
// const weather = [];


function weatherForecast(locationInfo) {
  //Constructor for weather data
  const weather = [];
  const darkSkyData = require('./data/darksky.json');
  let currentTime = new Date().getTime();
  let currentDate = new Date(currentTime);

  darkSkyData.daily.forEach(item => {
    let obj = {
      forecast: 'good',
      time:'too good time',
    }
    weather.push(obj);
  })

  console.log(weather);
  
  

  // let obj = {
  //   forecast: item.data[0].summary,
  //   time: new Date(currentDate - new Date(item.data[0].time)).toDateString()
  // };
  // const weather = [


  //   {
  //     forecast: darkSkyData.daily.data[0].summary,
  //     time: new Date(currentDate - new Date(darkSkyData.daily.data[0].time)).toDateString(),
  //   },
  //   {
  //     forecast: "Mostly cloudy in the morning.",
  //     time: "Tue Jan 02 2001"
  //   }
    
  // ]

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
  console.log(location);
  return location;
}



// Start the server
app.listen(PORT, () => {
  console.log(`Our app is up on port ${PORT}`)
})

