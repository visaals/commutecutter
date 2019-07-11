const geocodeService = require('../services/GeocodeService');
const directionsService = require('../services/DirectionsService');
const moment = require('moment')

var exports = module.exports = {}

exports.getRoute = function (req) {
    let routeQuery = {
        sourceAddress: req.body.sourceAddress,
        destinationAddress: req.body.destinationAddress,
        commuteType: req.body.commuteType,
        commuteDaysPerWeek: 1
    }
    return getRouteKernel(routeQuery);
}

function getRouteKernel(routeQuery) {
    let route = getLatLngPair(routeQuery)
        .then(directionsService.computeRoute)
        .then(extractRouteData)
        .then(route => multiplyRouteByFrequency(route, routeQuery))
        .catch(errMsg => showError(errMsg, routeQuery));
    return route;
}


function getLatLngPair (routeQuery) {
    let getSourceLatLng = geocodeService.convertAddressToLatLng(routeQuery.sourceAddress);
    let getDestinationLatLng = geocodeService.convertAddressToLatLng(routeQuery.destinationAddress);
    return Promise.all([getSourceLatLng, getDestinationLatLng, routeQuery.commuteType]);
}

function extractRouteData (response) {
    if (response.json.status !== 'OK') {
        throw "Directions API call failed. Status: " + response.json.status;
    }
    let legs = response.json.routes[0].legs[0];
    let distance = legs.distance;
    let duration = legs.duration;
    let startAddress = legs.start_address;
    let endAddress = legs.end_address;
    let route = [distance, duration, startAddress, endAddress];
    return route;
}

function multiplyRouteByFrequency(route, routeQuery) {
    let daysPerWeek = routeQuery.commuteDaysPerWeek;
    let miles = parseInt(route[0].text.split(" ")[0]);
    let distanceUnit = route[0].text.split(" ")[1];
    let time = convertGoogleMapsTimeToSeconds(route[1].text); 
    route[0] = (miles * daysPerWeek) + " " + distanceUnit;
    route[1] = (time * daysPerWeek) + " seconds";
    return route;
}


function convertGoogleMapsTimeToSeconds(timeString) {
    /**
     * timeString typically in the format 5d 10h 40 min, 40 h, or 11 min, etc.
     */
    let timeArray = timeString.split(" ");
    let totalSeconds = 0;
    let timeElements = [];
    for (let i = 0; i < timeArray.length; i+=2) {
        let timeElement = {};
        timeElement.value = timeArray[i];
        timeElement.unit = timeArray[i+1];
        timeElements.push(timeElement);
    }
    timeElements.map(timeElement => {
        let timeInSeconds = -1;
        let valueAsInt = parseInt(timeElement.value);
        if (valueAsInt === NaN) {
            throw "Exception: convertGoogleMapsTimeToSeconds() failed";
        }
        let timeUnitString = cleanTimeUnitString(timeElement.unit);
        if (timeUnitString === "day") {
            timeInSeconds = valueAsInt * 24 * 60 * 60;
        } else if (timeUnitString === "hour") {
            timeInSeconds = valueAsInt * 60 * 60;
        } else if (timeUnitString === "minute") {
            timeInSeconds = valueAsInt * 60;
        } else {
            throw "Exception: cleanTimeUnitString() failed";
        }
        totalSeconds += timeInSeconds;
    });
    return totalSeconds;
}

function cleanTimeUnitString(timeUnitString) {
    let timeUnits = {
        "day": ["day", "days", "d"],
        "hour": ["hour", "h", "hr", "hours", "hrs", "hs"],
        "minute": ["minute", "min", "m", "mins"],
    }
    for (let key in timeUnits) {
        if (timeUnits[key].includes(timeUnitString)) {
            return key;
        }
    }
    throw "Exception: cleanTimeUnitString() failed";
}

function showError (errMsg, routeQuery) {
    console.log(errMsg);
    return "Please select a different travel mode for this route from "
        + routeQuery.sourceAddress + " to " + routeQuery.destinationAddress;
}

exports.getBulkRoutes = function (req) {
    let sourceAddresses = req.body.sourceAddresses;
    let commutes = req.body.commutes;
    let routeQueries = createRouteQueries(sourceAddresses, commutes);
    let bulkRoutes = routeQueries
        .map(getRouteKernel);
    return Promise.all(bulkRoutes);
}

function createRouteQueries(sourceAddresses, commutes) {
    let routeQueries = [];
    sourceAddresses.map(sourceAddress => commutes.map(commute => createRoute(sourceAddress, commute, routeQueries)))
    return routeQueries;
}

function createRoute(sourceAddress, commute, routeQueries) {
    let query = {
        sourceAddress: sourceAddress,
        destinationAddress: commute.destinationAddress,
        commuteType: commute.commuteType,
        commuteDaysPerWeek: commute.commuteDaysPerWeek
    }
    routeQueries.push(query);
}









