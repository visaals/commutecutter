import React from "react"

const AddressInput = (props) => {
  return (
    props.addresses.map((val, idx)=> {
      let addressName = `address-${idx}`
      return (
        <div key={idx}>
          <label htmlFor={addressName}>{`Address #${idx + 1}`}</label>
          <input
            type="text"
            name={addressName}
            data-id={val.id}
            id={val.id}
            value={val.address} 
            className="address"
          />
          <button 
            onClick={props.deleteAddress}            
            data-id={val.id}
          >
            Delete Address
          </button>

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