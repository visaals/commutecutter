import React from "react"
import AddressForm from "../Components/AddressForm";
import Button from 'react-bootstrap/Button'



class CCFormContainer extends React.Component {
    constructor() {
        super()
        this.stepOneEndRef = React.createRef()
        this.stepTwoEndRef = React.createRef()
    }

    state = {

    }

    scrollToNextStep = (step) => {
        //console.log("STEP: " + JSON.stringify(this.stepOneEndRef))
        //console.log("current: " + JSON.stringify(this.stepOneEndRef.current))
        step.current.scrollIntoView({ behavior: 'smooth' })
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Step 1: Enter the addresses of places you might live</h3>
                </div>
                <AddressForm placeholder={"Enter the address of a potential home"} includeCommuteOptions={false} scroll={() => this.scrollToNextStep(this.stepOneEndRef)}/>
                <div ref={this.stepOneEndRef}>
                    <h3>Step 2: Enter the addresses of places you want to commute</h3>
                </div>
                <AddressForm placeholder={"Enter the address of a potential commute"} includeCommuteOptions={true} scroll={() => this.scrollToNextStep(this.stepTwoEndRef)}/>
                <div ref={this.stepTwoEndRef}>
                    <h3>Step 3: Look at your commutes!</h3>
                </div>
            </div>
        )
    }

}

export default CCFormContainer;