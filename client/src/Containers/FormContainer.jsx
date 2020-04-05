import React from "react"
import AddressInputContainer from "./AddressInputContainer"
import AddressCommuteTableView from "../Views/AddressCommuteTableView"
import CommuteResultsContainer from "./CommuteResultsContainer";
import Button from "react-bootstrap/Button"

const constants = require('../constants')


class CCFormContainer extends React.Component {

    constructor() {
        super()
        this.stepOneEndRef = React.createRef()
        this.showStepOne = true

        this.stepTwoEndRef = React.createRef()
        this.showStepTwo = false

        this.stepThreeEndRef = React.createRef()
        this.showStepThree = false

        this.stepFourEndRef = React.createRef()
        this.showStepFour = false


        this.addressPlaceholder = "Enter the address of a potential home"
        this.commuteAddressPlaceholder = "Enter the address of a potential commute"
    }

    state = {
        addresses: [],
        commutes: [],
        showStepTwo: false,
        showStepThree: false,
        showStepFour: false
    }

    scrollToNextStep = (step, showStep) => {
        this.setState({
            [showStep]: true
        }, () => {
            step.current.scrollIntoView({ behavior: 'smooth' })
        })
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

        let stepTwo = (
            <div ref={this.stepOneEndRef}>
                <h3>Step 2: Enter the addresses of places you want to commute</h3>
                <p>This could be where you and your roommates work, your favorite gym/grocery store/coffee shop, etc.</p>
                <AddressInputContainer 
                    placeholder={this.commuteAddressPlaceholder}
                    defaultNumRows={2}
                    includeCommuteOptions={true} 
                    scroll={() => this.scrollToNextStep(this.stepTwoEndRef, "showStepThree")}
                    propagateAddresses={this.setCommutes}
                />
            </div>
        )

        let stepThree = (
            <div ref={this.stepTwoEndRef}>
                <h3>Step 3: Check your Addresses!</h3>
                <p>If the addresses look right you are good to go! Otherwise edit them above and resubmit.</p>
                <AddressCommuteTableView 
                    addresses={this.state.addresses}
                    commutes={this.state.commutes} 
                />
                <Button onClick={() => this.scrollToNextStep(this.stepFourEndRef, "showStepFour")}>Get Commutes!</Button>

            </div>
        )

        let stepFour = (

            <div ref={this.stepThreeEndRef}>
                <h3>Step 4: Get your commutes!</h3>
                <p>Here are the homes with the shortest commute</p>
                <CommuteResultsContainer 
                    addresses={this.state.addresses}
                    commutes={this.state.commutes}
                />
            </div>

        )
        return (
            <div>
                <div>
                    <h3>Step 1: Enter the addresses of places you might live</h3>
                    <AddressInputContainer 
                        placeholder={this.addressPlaceholder} 
                        defaultNumRows={2}
                        includeCommuteOptions={false} 
                        scroll={() => this.scrollToNextStep(this.stepOneEndRef, "showStepTwo")}
                        propagateAddresses={this.setAddresses}
                    />
                </div>
                
                {(this.state.showStepTwo ? (stepTwo): (<div ref={this.stepOneEndRef}></div>))}
                
                {(this.state.showStepThree ? (stepThree): (<div ref={this.stepTwoEndRef}></div>))}

                {(this.state.showStepFour ? (stepFour): (<div ref={this.stepThreeEndRef}></div>))}
                <br />

                <div ref={this.stepFourEndRef}>
                    <p>Well, here are how long you're going to spend commuting at each aparmtent!</p>
                </div>


            </div>
        )
    }

}

export default CCFormContainer;