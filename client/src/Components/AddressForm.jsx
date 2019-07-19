import React from "react"
import AddressInput from "./AddressInput.jsx"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class AddressForm extends React.Component {
  constructor(props) {
    super()

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
    newRow.address = ""
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
              <AddressInput 
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

export default AddressForm;