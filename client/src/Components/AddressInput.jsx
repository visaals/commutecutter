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
  return (
    props.addresses.map((val, idx)=> {
      let addressName = `address-${idx}`
      return (
        <div key={idx}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text htmlFor={addressName}>{`Address #${idx + 1}`}</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as='input'
              placeholder="Enter an address of a potential home"
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
                <ToggleButton value={1}>Driving</ToggleButton>
                <ToggleButton value={2}>Transit</ToggleButton>
                <ToggleButton value={3}>Walking</ToggleButton>
                <ToggleButton value={4}>Cycling</ToggleButton>
              </ToggleButtonGroup>
              {/* commute frequency */}
              <ToggleButtonGroup 
                name={"commuteFrequency-"+val.id}
                type="radio"
                value={val.commuteFrequency}
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
    })
  )
}

export default AddressInput;



/**
 * 
 * <Form>
                <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter an address of a potential home" onChange={this.handleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your address with anyone else.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onSubmit={this.onSubmit}>
                    Submit
                </Button>
            </Form>
 * 
 */