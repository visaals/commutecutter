import React from "react"
import AddressInput from "./AddressInput.jsx"

class AddressForm extends React.Component {
  constructor() {
    super();
    this.counter = 0
  }
  state = {
    addresses: [{address:"", id:0}],
  }

  handleChange = (e) => {
      if (["address"].includes(e.target.className) ) {
        let addresses = [...this.state.addresses].map(element => {
          if (element.id == e.target.dataset.id) {
            element.address = e.target.value
          }
          return element
        })
        this.setState({ addresses }, () => console.log(this.state.addresses))
      } 
  }

  addAddress = (e) => {
      this.setState((prevState) => ({
        addresses: [...prevState.addresses, {address:"", id:this.counter}],
      }));
      this.counter++
  }

  deleteAddress = (e) => {
      console.log("delete button pressed");
      console.log(e.target.dataset.id);
      let deleteId = e.target.dataset.id

      this.setState((prevState) => {
        let addresses = [...prevState.addresses]
        let newAddresses  = addresses.filter(element => element.id != deleteId)

        newAddresses.sort(function(x,y) {
          if (x.id < y.id) return -1
          if (x.id > y.id) return 1
          return 0
        })
        console.log(newAddresses)
        


        return {addresses: newAddresses}
      });

  }

  handleSubmit = (e) => { e.preventDefault() }

  render() {
      let {addresses} = this.state
      return (
        <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
          <button onClick={this.addAddress}>Add Address</button>
          <AddressInput addresses={addresses} deleteAddress={this.deleteAddress}/>
          <input type="submit" value="Submit" /> 
        </form>
      )
  }
}
export default AddressForm;