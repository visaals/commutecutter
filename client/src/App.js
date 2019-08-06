import React, { Component } from 'react'
import './App.css'
import FormContainer from './Containers/FormContainer.jsx'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">CommuteCutter v0.0.1</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">App</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>
        
        <br></br>

        <FormContainer />
      </div>
    );
  }
}
export default App;
