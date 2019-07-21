import React from "react"
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Table from 'react-bootstrap/Table'

function generateRows (addresses, commutes) {
    let rows = []
    if (addresses.length >= commutes.length) {
        for (let i = 0; i < addresses.length; i++) {
            let row = []
            row.push(addresses[i])
            if (i < commutes.length) {
                row.push(commutes[i].address)
                row.push(commutes[i].commuteType)
                row.push(commutes[i].commuteDaysPerWeek)
            } else {
                for (let j = 0; j < 3; j++) {
                    row.push("")
                }
            }
            rows.push(row)
        }
    } else {
        for (let i = 0; i < commutes.length; i++) {
            let row = []
            if (i < addresses.length) {
                row.push(addresses[i])
            } else {
                row.push("")
            }
            row.push(commutes[i].address)
            row.push(commutes[i].commuteType)
            row.push(commutes[i].commuteDaysPerWeek)
            rows.push(row)
        }
    }
    return rows
}


const AddressCommuteTableView = (props) => {

    let addresses = props.addresses
    let commutes = props.commutes

    let rows = generateRows(addresses, commutes)
    console.log(rows)
    console.log(props)
    return (

        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Potential Homes</th>
                        <th>Frequent Commutes</th>
                        <th>Commute Type</th>
                        <th>Commute Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>{}</tr>
                </tbody>
            </Table>
        </div>
    )
    

 
}
export default AddressCommuteTableView;
