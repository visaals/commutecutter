const geocodeService = require('../services/GeocodeService');
const directionsService = require('../services/DirectionsService');

class RouteBuilder {    
    constructor(sourceAddresses, commutes) {
        this.sourceAddresses = sourceAddresses;
        this.commutes = commutes;
        this.routeQueries = [];
        this._buildRoute = this._buildRoute.bind(this);
        this._populateRouteQueries();
    }

    _populateRouteQueries() {
        this.sourceAddresses
            .map(sourceAddress => this.commutes
                .map(commute => this._addRoute(sourceAddress, commute)));
    }
    
    _addRoute(sourceAddress, commute) {
        let query = {
            sourceAddress: sourceAddress,
            destinationAddress: commute.destinationAddress,
            commuteType: commute.commuteType,
            commuteDaysPerWeek: commute.commuteDaysPerWeek
        }
        this.routeQueries.push(query);
    }

    buildRoutes() {
        return this._buildRoutesKernel();
    }

    _buildRoutesKernel() {
        let routes = this.routeQueries.map(this._buildRoute);
        return routes;
    }
    
    _buildRoute(routeQuery) {
        let route = this._getLatLngPair(routeQuery)
            .then(directionsService.computeRoute)
            .then(this._extractRouteData)
            .catch(errMsg => this._showError(errMsg, routeQuery));
        return route;
    }

    _getLatLngPair (routeQuery) {
        let getSourceLatLng = geocodeService.convertAddressToLatLng(routeQuery.sourceAddress);
        let getDestinationLatLng = geocodeService.convertAddressToLatLng(routeQuery.destinationAddress);
        return Promise.all([getSourceLatLng, getDestinationLatLng, routeQuery.commuteType]);
    }
    
    _extractRouteData (response) {
        if (response.json.status !== 'OK') {
            throw "Directions API call failed. Status: " + response.json.status;
        }
        let legs = response.json.routes[0].legs[0];
        let distance = legs.distance;
        let duration = legs.duration;
        if (response.query.mode === "driving") {
            duration = legs.duration_in_traffic
        }
        let startAddress = legs.start_address;
        let endAddress = legs.end_address;
        let route = [distance, duration, startAddress, endAddress];
        return route;
    }
    
    _showError (errMsg, routeQuery) {
        console.log("errMsg: " + errMsg);
        return "Please select a different travel mode for this route from "
            + routeQuery.sourceAddress + " to " + routeQuery.destinationAddress + ", errMsg: " + errMsg;
    }
}

module.exports = RouteBuilder;
