
var RouteBuilder = require('../utilities/RouteBuilder');
var exports = module.exports = {}

exports.getRoute = function (req) {
    // let routeQuery = {
    //     sourceAddress: req.body.sourceAddress,
    //     destinationAddress: req.body.destinationAddress,
    //     commuteType: req.body.commuteType,
    //     commuteDaysPerWeek: 1
    // }
    let sourceAddresses = [req.body.sourceAddress];
    let commutes = [
        {
            destinationAddress: req.body.destinationAddress,
            commuteType: req.body.commuteType,
            commuteDaysPerWeek: req.body.commuteDaysPerWeek,
        }
    ];
    let routeBuilder = new RouteBuilder(sourceAddresses, commutes);
    let routes = routeBuilder.buildRoutes();
    return Promise.all(routes);
}

// function getRouteKernel(routeQuery) {
//     let route = getLatLngPair(routeQuery)
//         .then(directionsService.computeRoute)
//         .then(extractRouteData)
//         .then(route => multiplyRouteByFrequency(route, routeQuery))
//         .catch(errMsg => showError(errMsg, routeQuery));
//     return route;
// }

exports.getBulkRoutes = function (req) {
    let sourceAddresses = req.body.sourceAddresses;
    let commutes = req.body.commutes;
    let routeBuilder = new RouteBuilder(sourceAddresses, commutes);
    let routes = routeBuilder.buildRoutes();
    return Promise.all(routes);
}











