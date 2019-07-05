import React from "react"
import AddressInput from "./AddressInput.jsx"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class AddressForm extends React.Component {
  constructor() {
    super();
    this.counter = 0
  }

  state = {
    rows: [{id:0, address:"", commuteType:1, commuteFrequency:7}],
  }

  handleChange = (e) => {
      let nameId = e.target.name.split('-')
      let targetName = nameId[0]
      let datasetId = parseInt(nameId[1])
      console.log(e.target.value)
      if (["address form-control"].includes(e.target.className) ) {
        let rows = [...this.state.rows].map(element => {
          if (element.id == e.target.dataset.id) {
            element.address = e.target.value
          }
          return element
        })
        this.setState({ rows }, () => console.log(this.state.rows))
      } 
      else if (["commuteType"].includes(targetName) ) {
        let rows = [...this.state.rows].map(element => {
          if (element.id == datasetId) {
            element.commuteType = parseInt(e.target.value)
          }
          return element
        })
        this.setState({ rows }, () => console.log(this.state.rows))
      }
      else if (["commuteFrequency"].includes(targetName) ) {
        let rows = [...this.state.rows].map(element => {
          if (element.id == datasetId) {
            element.commuteFrequency = parseInt(e.target.value)
          }
          return element
        })
        this.setState({ rows }, () => console.log(this.state.rows))
      }
  }

  addRow = (e) => {
     this.counter++
     let curr = this.counter
      this.setState((prevState) => ({
        rows: [...prevState.rows, {id:curr, address:"", commuteType:1, commuteFrequency:7}],
      }));
  }

  deleteRow = (e) => {
      let deleteId = e.target.dataset.id
      console.log("deleting: " + e.target.dataset.id)
      this.setState((prevState) => {
        let newAddresses  = [...prevState.rows].filter(element => element.id != deleteId)
        return {rows: newAddresses}
      });
  }

  handleSubmit = (e) => { e.preventDefault() }

  render() {
      let {rows} = this.state
      return (
        <div className="AddressForm">
          <Form onSubmit={this.handleSubmit} onChange={this.handleChange} >
            <Button onClick={this.addRow}>Add Address</Button>
            <Form.Group>
              <AddressInput addresses={rows} deleteRow={this.deleteRow}/>
            </Form.Group>
            <Button type="submit" value="Submit">Submit</Button> 
          </Form>
        </div>
      )
  }
}
export default AddressForm;