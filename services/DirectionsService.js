var exports = module.exports = {};
const config = require('../config');

const googleMapsClient = require('@google/maps').createClient({
    key: config.APIKEY,
    Promise: Promise
});

exports.computeRoute = function (srcDst) {
    console.log(...srcDst)
    let query = {
      origin: srcDst[0],
      destination: srcDst[1],
    }
    return googleMapsClient.directions(query).asPromise();
}