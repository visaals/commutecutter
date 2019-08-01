import React from "react"
import AddressInputContainer from "./AddressInputContainer"
import AddressCommuteTableView from "../Views/AddressCommuteTableView"
import Button from "react-bootstrap/Button";
const axios = require('axios')
const constants = require('../constants')
var CommuteFormatter = require('../Utilities/CommuteFormatter');


class CCFormContainer extends React.Component {

    constructor() {
        super()
        this.stepOneEndRef = React.createRef()
        this.stepTwoEndRef = React.createRef()
        this.addressPlaceholder = "Enter the address of a potential home"
        this.commuteAddressPlaceholder = "Enter the address of a potential commute"
    }

    testRequest = () => {
        console.log("testing request...")
        console.log(this.state.addresses)
        console.log(this.state.commutes)

        let herokuAPI = 'https://secure-depths-82332.herokuapp.com/api'
        let localAPI = "http://localhost:5000/api"
        const instance = axios.create({
            baseURL: localAPI,
            timeout: 10000,
            headers: {'Content-Type': 'application/json'}
          });
        instance.post('/bulk-directions', {
            sourceAddresses: this.state.addresses,
            commutes: this.state.commutes
        })
        .then(function (response) {
            
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

            for (let i = 0; i < homes.length; i++) {
                let home = homes[i]
                for (let j = 0; j < home.length; j++) {
                    let commute = home[j]
                    let commuteFormatter = new CommuteFormatter(commute)
                    let formattedCommute = commuteFormatter.formatAndApplyCommuteFrequency()
                    console.log("formatted Commute: " + JSON.stringify(formattedCommute, null, 2))
                }
                console.log("-------------------")
            }

           // console.log("homes: " + JSON.stringify(homes, null, 2))

            


        })
        .catch(function (error) {
            console.log("post error: " + error);
        });
    }
    
    state = {
        addresses: [],
        commutes: [],
    }

    scrollToNextStep = (step) => {
        step.current.scrollIntoView({ behavior: 'smooth' })
    }

    setAddresses = (addresses) => {
        addresses = addresses.map(address => address.address)
        this.setState({
            addresses: addresses
        })
    }

    setCommutes = (rawCommutes) => {
        let newCommutes = []
        for (let i = 0; i < rawCommutes.length; i++) {
            let newCommute = {}
            let rawCommute = rawCommutes[i]
            newCommute.id = rawCommute.id;
            newCommute.address = rawCommute.address
            newCommute.destinationAddress = rawCommute.address
            newCommute.commuteType = constants[rawCommute.commuteType]
            newCommute.commuteDaysPerWeek = rawCommute.commuteDaysPerWeek
            newCommutes.push(newCommute)
        }
        this.setState({
            commutes: newCommutes
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Step 1: Enter the addresses of places you might live</h3>
                </div>
                <AddressInputContainer 
                    placeholder={this.addressPlaceholder} 
                    defaultNumRows={2}
                    includeCommuteOptions={false} 
                    scroll={() => this.scrollToNextStep(this.stepOneEndRef)}
                    propagateAddresses={this.setAddresses}
                />
                <div ref={this.stepOneEndRef}>
                    <h3>Step 2: Enter the addresses of places you want to commute</h3>
                    <p>This could be where you and your roommates work, your favorite gym/grocery store/coffee shop, etc.</p>

                </div>
                <AddressInputContainer 
                    placeholder={this.commuteAddressPlaceholder}
                    defaultNumRows={2}
                    includeCommuteOptions={true} 
                    scroll={() => this.scrollToNextStep(this.stepTwoEndRef)}
                    propagateAddresses={this.setCommutes}
                />
                <div ref={this.stepTwoEndRef}>
                    <h3>Step 3: Check your Addresses!</h3>
                    <p>If the addresses look right you are good to go! Otherwise edit them above and resubmit.</p>

                    <AddressCommuteTableView 
                            addresses={this.state.addresses}
                            commutes={this.state.commutes} 
                            />
                    <Button onClick={this.testRequest}>Test Request</Button>
                </div>


            </div>
        )
    }

}

export default CCFormContainer;