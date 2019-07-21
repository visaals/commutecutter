import React from "react"
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const AddressInputView = (props) => {
  const onChange = (e) => {
      // here to get rid of warning
  }
  let constants = require('../constants')
  return (
    props.addresses.map((val, idx)=> {
      let addressName = `address-${idx}`
      let commuteOptions = <div></div>;
      if (props.includeCommuteOptions) {
        commuteOptions = 
          <ButtonToolbar aria-label="Toolbar with button groups">
            <InputGroup.Prepend>
              <InputGroup.Text >{"Commute Type"}</InputGroup.Text>
            </InputGroup.Prepend>            
            <ToggleButtonGroup 
                name={"commuteType-"+val.id}
                type="radio"
                value={val.commuteType}
                onChange={onChange}
                aria-label="first group"
                className="mr-2"
              >
                <ToggleButton value={constants.DRIVING}>Driving</ToggleButton>
                <ToggleButton value={constants.TRANSIT}>Transit</ToggleButton>
                <ToggleButton value={constants.WALKING}>Walking</ToggleButton>
                <ToggleButton value={constants.BICYCLING}>Bicycling</ToggleButton>
              </ToggleButtonGroup>
              <InputGroup.Prepend>
                <InputGroup.Text >{"Days Per Week"}</InputGroup.Text>
              </InputGroup.Prepend>   

              <ToggleButtonGroup 
                name={"commuteDaysPerWeek-"+val.id}
                type="radio"
                value={val.commuteDaysPerWeek}
                onChange={onChange}
                aria-label="second group"
                className="mr-2"
              >
                <ToggleButton value={1}>1</ToggleButton>
                <ToggleButton value={2}>2</ToggleButton>
                <ToggleButton value={3}>3</ToggleButton>
                <ToggleButton value={4}>4</ToggleButton>
                <ToggleButton value={5}>5</ToggleButton>
                <ToggleButton value={6}>6</ToggleButton>
                <ToggleButton value={7}>7</ToggleButton>
              </ToggleButtonGroup>

            </ButtonToolbar>;
      }

      return (
        <div key={idx} className='address-row'>
          <InputGroup>
          
            <InputGroup.Prepend>
              <InputGroup.Text htmlFor={addressName}>{`Address`}</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control
              as='input'
              placeholder={props.placeholder}
              name={"address-"+val.id}
              value={val.address} 
              onChange={onChange}
              className="address"
              type='string'
            />

            <InputGroup.Append>
              {/* delete */}
              <ButtonGroup >
                <Button 
                  onClick={props.deleteRow}            
                  data-id={val.id}
                  variant="danger"
                >
                  Delete Address
                </Button>
              </ButtonGroup>
            </InputGroup.Append>

          </InputGroup>

          <InputGroup>
            {commuteOptions}
          </InputGroup>

        </div>
      )
    })
  )
}
export default AddressInputView;
