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
        this.meters = commute[0].value
        this.seconds = commute[1].value

        this.source = commute[2]
        this.destination = commute[3]
        this.commuteType = commute[4]
        this.commuteDaysPerWeek = commute[5]
    }

    formatAndApplyCommuteFrequency () {

        let timeString = this._secondsToHourMinute(this.seconds)
        let distance = this._metersToMiles(this.meters)

        let totalSeconds = this.seconds * this.commuteDaysPerWeek * 2
        let totalMeters = this.meters * this.commuteDaysPerWeek * 2

        let totalCommuteTimeString = this._secondsToHourMinute(totalSeconds)
        let totalCommuteMiles = this._metersToMiles(totalMeters)



        return {
            "timeString": timeString,
            "totalTimeString": totalCommuteTimeString,
            "seconds": this.seconds,
            "totalSeconds": totalSeconds,
            "distance": distance,
            "totalDistance": totalCommuteMiles,
            "source": this.source,
            "destination": this.destination,
            "commuteType": this.commuteType,
            "commuteDaysPerWeek": this.commuteDaysPerWeek
        }

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
