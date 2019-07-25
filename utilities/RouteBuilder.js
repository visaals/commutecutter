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
            .then((response) => this._extractRouteData(response, routeQuery))
            .then(route => this._multiplyRouteByCommuteFrequency(route, routeQuery))
            .catch(errMsg => this._showError(errMsg, routeQuery));
        return route;
    }

    _getLatLngPair (routeQuery) {
        let getSourceLatLng = geocodeService.convertAddressToLatLng(routeQuery.sourceAddress);
        let getDestinationLatLng = geocodeService.convertAddressToLatLng(routeQuery.destinationAddress);
        return Promise.all([getSourceLatLng, getDestinationLatLng, routeQuery.commuteType]);
    }
    
    _extractRouteData (response, routeQuery) {
        if (response.json.status !== 'OK') {
            throw "Directions API call failed. Status: " + response.json.status;
        }
        let legs = response.json.routes[0].legs[0];
        let distance = legs.distance;
        let duration = legs.duration;
        if (routeQuery.commuteType === "driving") {
            duration = legs.duration_in_traffic
        }
        let startAddress = legs.start_address;
        let endAddress = legs.end_address;
        let route = [distance, duration, startAddress, endAddress];
        return route;
    }
    
    _multiplyRouteByCommuteFrequency(route, routeQuery) {
        let daysPerWeek = routeQuery.commuteDaysPerWeek;
        let miles = parseFloat(route[0].text.split(" ")[0]) * 2; // 2 because commute distance is there and back
        let distanceUnit = route[0].text.split(" ")[1];
        let time = this.convertGoogleMapsTimeToSeconds(route[1].text) * 2; // 2 because commute time is 2 way 
        route[0] = (miles * daysPerWeek) + " " + distanceUnit;
        route[1] = this.secondsToDHM((time * daysPerWeek)) + " total, " + this.secondsToDHM(time/2) + " per commute";
        route.push(time)
        route.push(daysPerWeek)
        return route;
    }
    
    secondsToDHM(totalSeconds) {
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        return hours + " h " + minutes + " mins";
    }
    
    convertGoogleMapsTimeToSeconds(timeString) {
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
            let timeUnitString = this.cleanTimeUnitString(timeElement.unit);
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
    
    cleanTimeUnitString(timeUnitString) {
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
    
    _showError (errMsg, routeQuery) {
        console.log("errMsg: " + errMsg);
        return "Please select a different travel mode for this route from "
            + routeQuery.sourceAddress + " to " + routeQuery.destinationAddress + ", errMsg: " + errMsg;
    }
}

module.exports = RouteBuilder;
