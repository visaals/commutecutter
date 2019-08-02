class CommuteFormatter {
    /*
    [
        {
        "text": "1.5 mi",
        "value": 2475
        },
        {
        "text": "16 mins",
        "value": 967
        },
        "1266 Utah St, San Francisco, CA 94110, USA",
        "1550 Bryant St, San Francisco, CA 94103, USA",
        "transit",
        2
    ]
    */
    constructor (commute) {

        if (commute === undefined) {
            this.meters = 0
            this.seconds = 0

            this.source = ""
            this.destination = ""
            this.commuteType = ""
            this.commuteDaysPerWeek = 0
        } else {
            this.meters = commute[0].value
            this.seconds = commute[1].value
    
            this.source = commute[2]
            this.destination = commute[3]
            this.commuteType = commute[4]
            this.commuteDaysPerWeek = commute[5]
        }

        this.totalSeconds = 0
        this.totalCommuteTimeString = ""
        this.totalCommuteMiles = 0
        this.totalCommuteMeters = 0
        this.miles = 0

        this.calculateTotalStatistics()

    }

    calculateTotalStatistics () {
        this.totalSeconds = this.seconds * this.commuteDaysPerWeek * 2
        this.totalCommuteTimeString = this._secondsToHourMinute(this.totalSeconds)
        this.totalCommuteMeters = this.meters * this.commuteDaysPerWeek * 2

        this.miles = this._metersToMiles(this.meters)
        this.totalCommuteMiles = this.miles * this.commuteDaysPerWeek * 2
    }

    formatAndApplyCommuteFrequency () {

        let timeString = this._secondsToHourMinute(this.seconds)

        return {
            "timeString": timeString,
            "totalTimeString": this.totalCommuteTimeString,
            "seconds": this.seconds,
            "totalSeconds": this.totalSeconds,
            "miles": this.miles,
            "totalDistance": this.totalCommuteMiles,
            "source": this.source,
            "destination": this.destination,
            "commuteType": this.commuteType,
            "commuteDaysPerWeek": this.commuteDaysPerWeek
        }

    }

    combineRawCommute (CommuteFormatterObject) {
        this.meters += CommuteFormatterObject.meters
        this.seconds += CommuteFormatterObject.seconds

        this.totalSeconds += CommuteFormatterObject.totalSeconds
        this.totalCommuteMiles += CommuteFormatterObject.totalCommuteMiles
        this.totalCommuteMeters += CommuteFormatterObject.totalCommuteMeters
        this.totalCommuteTimeString = this._secondsToHourMinute(this.totalSeconds)

        if (this.source === "") {
            this.source = CommuteFormatterObject.source
        }
        
        this.miles = this._metersToMiles(this.meters)
        
    }

    _metersToMiles (meters) {
        return (Math.round(meters * 0.000621371 * 10)/10)
    }

    _secondsToHourMinute (seconds) {
        let hours = Math.floor(seconds/3600);
        seconds %= 3600;
        let minutes = Math.floor(seconds/60);
        return hours + " h " + minutes + " m";
    }
}

module.exports = CommuteFormatter;
