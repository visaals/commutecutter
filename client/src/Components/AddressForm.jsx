import React from "react"
import AddressInput from "./AddressInput.jsx"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class AddressForm extends React.Component {
  constructor() {
    super()
    this.counter = 4
  }

  state = {
    rows: [{id:0, address:"", commuteType:1, commuteDaysPerWeek:5},{id:1, address:"", commuteType:1, commuteDaysPerWeek:5},{id:2, address:"", commuteType:1, commuteDaysPerWeek:5},{id:3, address:"", commuteType:1, commuteDaysPerWeek:5}],
  }

  handleChange = (e) => {
    let targetName = e.target.name.split('-')[0]
    let targetRowId = parseInt(e.target.name.split('-')[1])
    let rows = [...this.state.rows].map(row => {
      if (row.id == targetRowId) {
        if (targetName === "address") {
          row[targetName] = e.target.value
        } else {
          row[targetName] = parseInt(e.target.value)
        }
      }
      return row
    })
    this.setState({ rows }, () => console.log(this.state.rows))
  }

  addRow = (e) => {
    this.counter++
    let curr = this.counter
    this.setState((prevState) => ({
      rows: [...prevState.rows, {id:curr, address:"", commuteType:1, commuteDaysPerWeek:5}],
    }));
  }

  deleteRow = (e) => {
    let deleteId = e.target.dataset.id
    this.setState((prevState) => {
      let newAddresses  = [...prevState.rows].filter(element => element.id != deleteId)
      return {rows: newAddresses}
    });
  }

  handleSubmit = (e) => { 
    e.preventDefault()
    this.props.scroll()
  }

  render() {
      let {rows} = this.state
      return (
        <div className="AddressForm">
          <Form onSubmit={this.handleSubmit} onChange={this.handleChange} >
            <Form.Group>
              <AddressInput addresses={rows} deleteRow={this.deleteRow} placeholder={this.props.placeholder} includeCommuteOptions={this.props.includeCommuteOptions}/>
            </Form.Group>
            <Button onClick={this.addRow}>Add Address</Button>

            <Button type="submit" value="Submit" variant="success">Submit</Button> 
          </Form>
        </div>
      )
  }
}
export default AddressForm;