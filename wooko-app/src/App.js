import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

{/* <form onSubmit={this.Submit}>
                <FormGroup controlId="email" bsSize="large">
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={this.Change}
                  />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={this.Change}
                    type="password"
                  />
                </FormGroup>
                <FormGroup controlId="name" bsSize="large">
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                    value={this.state.name}
                    onChange={this.Change}
                    type="text"
                  />
                </FormGroup>
                <Button
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="submit"
                >
                  Signup
                </Button>
              </form> */}