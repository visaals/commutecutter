import React from "react"
import AddressInputContainer from "./AddressInputContainer"
import AddressCommuteTableView from "../Views/AddressCommuteTableView"
import Button from "react-bootstrap/Button";
const axios = require('axios')
const constants = require('../constants')

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
        const instance = axios.create({
            baseURL: 'https://secure-depths-82332.herokuapp.com/api',
            timeout: 10000,
            headers: {'Content-Type': 'application/json'}
          });
        instance.post('/bulk-directions', {
            sourceAddresses: this.state.addresses,
            commutes: this.state.commutes
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    state = {
        addresses: [],
        commutes: []
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
                    defaultNumRows={4}
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
                    defaultNumRows={4}
                    includeCommuteOptions={true} 
                    scroll={() => this.scrollToNextStep(this.stepTwoEndRef)}
                    propagateAddresses={this.setCommutes}
                />
                <div ref={this.stepTwoEndRef}>
                    <h3>Step 3: Check your Addresses!</h3>
                    <p>If the addresses look right you are good to go! Otherwise edit them above and resubmit.</p>
                    <p>
                        {JSON.stringify(this.state.addresses)}
                    </p>
                    <p>
                        {JSON.stringify(this.state.commutes)}
                    </p>
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