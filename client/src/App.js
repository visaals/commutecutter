import React, { Component } from 'react'
import './App.css'
import AddressForm from './Components/AddressForm.jsx'
import CCFormContainer from './Containers/CCFormContainer.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2> Welcome to CommuteCutter v0.0.1 </h2>
        <CCFormContainer />
      </div>
    );
  }
}

export default App;
