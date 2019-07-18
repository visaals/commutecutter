import React from "react"
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'


const AddressInput = (props) => {
  const onChange = (e) => {
      // here to get rid of warning
  }
  let constants = require('../constants')
  return (
    props.addresses.map((val, idx)=> {
      let addressName = `address-${idx}`

      if (props.includeCommuteOptions) {
        return (
          <div key={idx}>
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
  
              
              <ButtonToolbar>
                {/* commute type */}
                <ToggleButtonGroup 
                  name={"commuteType-"+val.id}
                  type="radio"
                  value={val.commuteType}
                  onChange={onChange}
                >
                  <ToggleButton value={constants.DRIVING}>Driving</ToggleButton>
                  <ToggleButton value={constants.TRANSIT}>Transit</ToggleButton>
                  <ToggleButton value={constants.WALKING}>Walking</ToggleButton>
                  <ToggleButton value={constants.BICYCLING}>Bicycling</ToggleButton>
                </ToggleButtonGroup>
                {/* commute frequency */}
                <ToggleButtonGroup 
                  name={"commuteDaysPerWeek-"+val.id}
                  type="radio"
                  value={val.commuteDaysPerWeek}
                  onChange={onChange}
                >
                  <ToggleButton value={1}>1</ToggleButton>
                  <ToggleButton value={2}>2</ToggleButton>
                  <ToggleButton value={3}>3</ToggleButton>
                  <ToggleButton value={4}>4</ToggleButton>
                  <ToggleButton value={5}>5</ToggleButton>
                  <ToggleButton value={6}>6</ToggleButton>
                  <ToggleButton value={7}>7</ToggleButton>
                </ToggleButtonGroup>
                {/* delete */}
                <ButtonGroup >
                  <Button 
                    onClick={props.deleteRow}            
                    data-id={val.id}
                  >
                    Delete Address
                  </Button>
                </ButtonGroup>
               </ButtonToolbar>  
              </InputGroup.Append>
            </InputGroup>
          </div>
        )
      } else {
        return (
          <div key={idx}>
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
              <ButtonToolbar>
                {/* delete */}
                <ButtonGroup >
                  <Button 
                    onClick={props.deleteRow}            
                    data-id={val.id}
                  >
                    Delete Address
                  </Button>
                </ButtonGroup>
               </ButtonToolbar>  
              </InputGroup.Append>
            </InputGroup>
          </div>
        )
      }

      
    })
  )
}
export default AddressInput;
