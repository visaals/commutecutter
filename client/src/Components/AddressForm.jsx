import React from "react"
import AddressInput from "./AddressInput.jsx"
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

class AddressForm extends React.Component {
  constructor() {
    super();
    this.counter = 0

  }
  state = {
    addresses: [{id:0, address:""}],
  }

  handleChange = (e) => {
      if (["address form-control"].includes(e.target.className) ) {
        let addresses = [...this.state.addresses].map(element => {
          if (element.id == e.target.dataset.id) {
            element.address = e.target.value
          }
          return element
        })
        this.setState({ addresses }, () => console.log(this.state.addresses))
      } 
  }

  addRow = (e) => {
      this.setState((prevState) => ({
        addresses: [...prevState.addresses, {address:"", id:this.counter}],
      }));
      this.counter++
  }

  deleteRow = (e) => {

      let deleteId = e.target.dataset.id
      this.setState((prevState) => {
        let newAddresses  = [...prevState.addresses].filter(element => element.id != deleteId)
        return {addresses: newAddresses}
      });

  }

  handleSubmit = (e) => { e.preventDefault() }

  render() {
      let {addresses} = this.state
      return (
        <div className="AddressForm">
          <Form onSubmit={this.handleSubmit} onChange={this.handleChange} >
            <Button onClick={this.addRow}>Add Address</Button>
            <Form.Group>
              <AddressInput addresses={addresses} deleteRow={this.deleteRow}/>
            </Form.Group>
            <Button type="submit" value="Submit">Submit</Button> 
          </Form>
        </div>
      )
  }
}
export default AddressForm;