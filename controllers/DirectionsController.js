
var RouteBuilder = require('../utilities/RouteBuilder');
var exports = module.exports = {}

exports.getRoute = function (req) {
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

exports.getBulkRoutes = function (req) {
    let sourceAddresses = req.body.sourceAddresses;
    let commutes = req.body.commutes;
    let routeBuilder = new RouteBuilder(sourceAddresses, commutes);
    let routes = routeBuilder.buildRoutes();
    return Promise.all(routes);
}











