var exports = module.exports = {};

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLEAPIKEY,
    Promise: Promise
});

exports.computeRoute = function (geocodedRouteQuery) {
    console.log(...geocodedRouteQuery)
    let query = {
      origin: geocodedRouteQuery[0],
      destination: geocodedRouteQuery[1],
      mode: geocodedRouteQuery[2],
      departure_time: new Date().getTime(),
      traffic_model: "pessimistic",
    }
    return googleMapsClient.directions(query).asPromise();
}