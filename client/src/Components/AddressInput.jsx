import React from "react"
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/Form'

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
              name={addressName}
              data-id={val.id}
              id={val.id}
              value={val.address} 
              onChange={onChange}
              className={"address"}
              type='string'
            />
            <InputGroup.Append>
              <Button 
                onClick={props.deleteRow}            
                data-id={val.id}
              >
                Delete Address
              </Button>
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