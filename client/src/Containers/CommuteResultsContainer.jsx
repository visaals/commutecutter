import React from 'react'
import Button from "react-bootstrap/Button"
import CommuteResultsView from "../Views/CommuteResultsView"
const axios = require('axios')
var CommuteFormatter = require('../Utilities/CommuteFormatter');

class CommuteResultsContainer extends React.Component {

    state = {
        tickets: []
    }

    sendRequest = () => {
        console.log("testing request...")
        console.log(this.props.addresses)
        console.log(this.props.commutes)

        let herokuAPI = 'https://secure-depths-82332.herokuapp.com/api'
        let localAPI = "http://localhost:5000/api"
        const instance = axios.create({
            baseURL: herokuAPI,
            timeout: 10000,
            headers: {'Content-Type': 'application/json'}
          });
        instance.post('/bulk-directions', {
            sourceAddresses: this.props.addresses,
            commutes: this.props.commutes
        })
        .then(response => this.formatAndSetState(response))
        .catch(function (error) {
            console.log("post error: " + error);
        });
    }

    formatAndSetState (response) {
            
        let data = response.data
        let queryData = JSON.parse(response.config.data)

        let queryAddresses = queryData.sourceAddresses
        let queryCommutes = queryData.commutes

        let homes = []
        let idx = 0;
        for (let i = 0; i < queryAddresses.length; i++) {
            let commuteTickets = []
            for (let j = 0; j < queryCommutes.length; j++) {
                let ticket = data[idx];
                ticket.push(queryCommutes[j].commuteType)
                ticket.push(queryCommutes[j].commuteDaysPerWeek)
                commuteTickets.push(data[idx])
                idx++
            }
            homes.push(commuteTickets)
        }

        let formattedTickets = []
        for (let i = 0; i < homes.length; i++) {
            let home = homes[i]
            let formattedTicket = []
            let totalCommute = new CommuteFormatter()
            for (let j = 0; j < home.length; j++) {
                let commute = home[j]
                let commuteFormatter = new CommuteFormatter(commute)
                let formattedCommute = commuteFormatter.formatAndApplyCommuteFrequency()
                totalCommute.combineRawCommute(commuteFormatter)
                formattedTicket.push(formattedCommute)
            }

            formattedTicket.push(totalCommute)
            formattedTickets.push(formattedTicket)
        }
        this.setState({
            tickets: formattedTickets
        })
    }

    summarizeTickets (tickets) {
        let summarizedTickets = []
        tickets.map(ticket => summarizedTickets.push(this.summarizeTicket(ticket)))
        return summarizedTickets
    }

    summarizeTicket (ticket) {
        let ticketSummaries = []
        let i = 0;
        for (; i < ticket.length - 1; i++) {
            let commuteObject = ticket[i]
            
            let summary = []
            summary.push(commuteObject.destination)
            summary.push(commuteObject.timeString)
            summary.push(commuteObject.totalTimeString)
            ticketSummaries.push(summary)
        }
        let summary = []
        summary.push(ticket[i].totalCommuteTimeString)
        summary.push(ticket[i].source)
        ticketSummaries.push(summary)


        return ticketSummaries
    }

    render () {
        return (
            <div>
                <Button onClick={this.sendRequest}>Find Commutes</Button>
                <CommuteResultsView
                    tickets={this.summarizeTickets(this.state.tickets)}
                />
            </div>
        )
    }
}

export default CommuteResultsContainer