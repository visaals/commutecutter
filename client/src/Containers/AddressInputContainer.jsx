import React from "react"
import AddressInputView from "../Views/AddressInputView.jsx"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class AddressInputContainer extends React.Component {
  constructor(props) {
    super()

    this.testAddresses = [
      "225 Bush Street San Francisco, CA", 
      "1550 Bryant St #200, San Francisco, CA 94103",
      "560 Sutter St Suite 300, San Francisco, CA 94102",
      "1266 Utah St, San Francisco, CA 94110",
      "1660 Florida Street, San Francisco, CA",
      "2901 Diamond St, San Francisco, CA 94131"
    ]
    
    this.numRows = props.defaultNumRows
    this.placeholder = props.placeholder
    this.includeCommuteOptions = props.includeCommuteOptions

    this.scrollToEnd = props.scroll
    this.propagateAddresses = props.propagateAddresses

    this.setupDefaultRows();
  }

  state = {
    rows: []
  }

  setupDefaultRows = () => {
    let rows = []
    for (let rowId = 0; rowId < this.numRows; rowId++) {
      let newRow = this.createNewRow(rowId)
      rows.push(newRow)
    }
    this.state.rows = [...rows]
    return rows
  }

  handleChange = (e) => {
    let targetName = this.parseEventTargetName(e)
    let targetRowId = this.parseEventTargetRowId(e)
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
    this.setState({ rows })//, () => console.log(this.state.rows))
  }

  parseEventTargetName = (e) => {
    return e.target.name.split('-')[0]
  }

  parseEventTargetRowId = (e) => {
    return parseInt(e.target.name.split('-')[1])
  }

  addRow = (e) => {
    this.numRows++
    let newRow = this.createNewRow(this.numRows)
    this.setState((prevState) => ({
      rows: [...prevState.rows, newRow],
    }));
  }

  createNewRow = (newRowId) => {
    let newRow = {}
    newRow.id = newRowId
    let randomIdx = Math.floor(Math.random() * this.testAddresses.length)
    newRow.address = this.testAddresses[randomIdx]
    if (this.includeCommuteOptions) {
      newRow.commuteType = 1
      newRow.commuteDaysPerWeek = 5
    }
    return newRow;
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
    this.scrollToEnd()
    this.propagateAddresses(this.state.rows)
  }

  render() {
      let {rows} = this.state
      return (
        <div className="AddressForm">
          <Form onSubmit={this.handleSubmit} onChange={this.handleChange} >
            <Form.Group>
              <AddressInputView 
                addresses={rows} 
                deleteRow={this.deleteRow} 
                placeholder={this.placeholder} 
                includeCommuteOptions={this.includeCommuteOptions}
              />
            </Form.Group>
            <Button onClick={this.addRow}>Add Address</Button>
            <Button type="submit" value="Submit" variant="success">Submit</Button> 
          </Form>
        </div>
      )
  }
}

export default AddressInputContainer;