import React from "react"
import AddressForm from "../Components/AddressForm";

class CCFormContainer extends React.Component {

    constructor() {
        super()
        this.stepOneEndRef = React.createRef()
        this.stepTwoEndRef = React.createRef()
    }

    scrollToNextStep = (step) => {
        step.current.scrollIntoView({ behavior: 'smooth' })
    }

    getAddresses = (addresses) => {
        console.log("CCFORMCONTAINER: ")
        console.log(addresses)
    }


    render() {
        return (
            <div>
                <div>
                    <h3>Step 1: Enter the addresses of places you might live</h3>
                </div>
                <AddressForm 
                    placeholder={"Enter the address of a potential home"} 
                    defaultNumRows={4}
                    includeCommuteOptions={false} 
                    scroll={() => this.scrollToNextStep(this.stepOneEndRef)}
                    propagateAddresses={this.getAddresses}
                />
                <div ref={this.stepOneEndRef}>
                    <h3>Step 2: Enter the addresses of places you want to commute</h3>
                </div>
                <AddressForm 
                    placeholder={"Enter the address of a potential commute"}
                    defaultNumRows={4}
                    includeCommuteOptions={true} 
                    scroll={() => this.scrollToNextStep(this.stepTwoEndRef)}
                    propagateAddresses={this.getAddresses}
                />
                <div ref={this.stepTwoEndRef}>
                    <h3>Step 3: Look at your commutes!</h3>
                </div>
            </div>
        )
    }

}

export default CCFormContainer;