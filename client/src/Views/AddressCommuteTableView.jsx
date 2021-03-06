import React from "react"
import Table from 'react-bootstrap/Table'

function generateRows (addresses, commutes) {
    let rows = []
    addresses = addresses.filter(e => e !== "");
    commutes = commutes.filter(e => e.address !== "");

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

function generateTableRow(row, id) {
    let htmlRow = [];
    for (let i = 0; i < row.length; i++) {
        let col = row[i]
        htmlRow.push(<td key={`${i}-${id}`}>{col}</td>)
    }
    return htmlRow;
}

const AddressCommuteTableView = (props) => {
    let addresses = props.addresses
    let commutes = props.commutes
    let rows = generateRows(addresses, commutes)
    return (
        <div>
            <Table striped hover border={"striped"}>
                <thead>
                    <tr>
                        <th>Potential Homes</th>
                        <th>Frequent Commutes</th>
                        <th>Commute Type</th>
                        <th>Commute Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, idx) => {
                        return <tr key={idx}>{generateTableRow(row, idx)}</tr>
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default AddressCommuteTableView;
