
const express = require('express');
const path = require('path');
const app = express();
const config = require('./config');


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {

  const arr = [1,2,3]

  // Return array as json
  res.json(arr);

  console.log(`Sent test API response`);
});

app.get('/api/directions', (req, res) => {
  const googleMapsClient = require('@google/maps').createClient({
    key: config.APIKEY,
    Promise: Promise
  });

  var getSourceLatLng = googleMapsClient.geocode({
    address: '2000 Paris Metz Rd. Chattanooga, TN'
  }).asPromise().then(geocodeAddress).catch(handleGeocodeFailure);

  var getDestinationLatLng = googleMapsClient.geocode({
    address: '227 Oakwood Court Winston-Salem, NC'
  }).asPromise().then(geocodeAddress).catch(handleGeocodeFailure);

  function geocodeAddress (response) {
    return response.json.results[0].geometry.location;
  }
  function handleGeocodeFailure (error) {
    console.log("Geocode Request Failed: " + JSON.stringify(error));
  }

  Promise.all([getSourceLatLng, getDestinationLatLng]).then(getRoute);

  function getRoute (srcDst) {
    let sourceLatLng = srcDst[0];
    let destinationLatLng = srcDst[1];
    console.log(...srcDst)
    let query = {
      origin: sourceLatLng,
      destination: destinationLatLng
    }
    googleMapsClient.directions(query).asPromise().then(showRoute);
  }

  function showRoute (response) {
    console.log(response);
    let legs = response.json.routes[0].legs[0];
    let distance = legs.distance;
    let duration = legs.duration;
    let startAddress = legs.start_address;
    let endAddress = legs.end_address;
    let route = [distance, duration, startAddress, endAddress];
    console.log(route);
    res.json(route);
  }

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
