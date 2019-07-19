import React from "react"
import AddressInputContainer from "../Components/AddressInputContainer";

class CCFormContainer extends React.Component {

    constructor() {
        super()
        this.stepOneEndRef = React.createRef()
        this.stepTwoEndRef = React.createRef()
        this.addressPlaceholder = "Enter the address of a potential home"
        this.commuteAddressPlaceholder = "Enter the address of a potential commute"
    }

    state = {
        addresses: [],
        commutes: []
    }

    scrollToNextStep = (step) => {
        step.current.scrollIntoView({ behavior: 'smooth' })
    }

    setAddresses = (addresses) => {
        this.setState({
            addresses: addresses
        })
    }

    setCommutes = (commutes) => {
        this.setState({
            commutes: commutes
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
                
                </div>


            </div>
        )
    }

}

export default CCFormContainer;