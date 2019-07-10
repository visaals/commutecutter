var exports = module.exports = {};
const constants = require('../constants');

const googleMapsClient = require('@google/maps').createClient({
    key: constants.APIKEY,
    Promise: Promise
});

exports.convertAddressToLatLng = function (address) {
    var geocodeRequest =  googleMapsClient.geocode({
        address: address
    }).asPromise().then(getLatLng).catch(handleGeocodeFailure);

    function getLatLng (response) {
        return response.json.results[0].geometry.location;
    }

    function handleGeocodeFailure (error) {
        throw "LatLng Conversion Request Failed: " + JSON.stringify(error);
    }

    return geocodeRequest;
}

