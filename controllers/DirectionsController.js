const geocodeService = require('../services/GeocodeService');
const directionsService = require('../services/DirectionsService');
var exports = module.exports = {}


exports.getRoute = function (req, res) {
    let sourceAddress = req.body.sourceAddress;
    let destinationAddress = req.body.destinationAddress;
    var route = getLatLngPair(sourceAddress, destinationAddress)
        .then(directionsService.computeRoute)
        .then(extractRouteData);
    return route;
}

function getLatLngPair (sourceAddress, destinationAddress) {
    let getSourceLatLng = geocodeService.convertAddressToLatLng(sourceAddress);
    let getDestinationLatLng = geocodeService.convertAddressToLatLng(destinationAddress);
    return Promise.all([getSourceLatLng, getDestinationLatLng]);
}

function extractRouteData (response) {
    let legs = response.json.routes[0].legs[0];
    let distance = legs.distance;
    let duration = legs.duration;
    let startAddress = legs.start_address;
    let endAddress = legs.end_address;
    let route = [distance, duration, startAddress, endAddress];
    return route;
}








