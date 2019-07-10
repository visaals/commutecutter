const geocodeService = require('../services/GeocodeService');
const directionsService = require('../services/DirectionsService');
var exports = module.exports = {}

exports.getRoute = function (req) {
    var routeQuery = {
        sourceAddress: req.body.sourceAddress,
        destinationAddress: req.body.destinationAddress,
        commuteType: req.body.commuteType,
    }
    var route = getLatLngPair(routeQuery)
        .then(directionsService.computeRoute)
        .then(extractRouteData)
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

function showError (errMsg, routeQuery) {
    console.log(errMsg);
    return "Please select a different travel mode for this route from "
        + routeQuery.sourceAddress + " to " + routeQuery.destinationAddress;
}








