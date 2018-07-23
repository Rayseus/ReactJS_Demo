/*This is a test signup page with React JS created by Ruiyang
included functions: react-route set domain address
                    form validation check, email, password confirmation and username
                    post user signup data to https://jsonplaceholder.typicode.com/users with Axios
*/
import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './signup.css';
import logo from './image/logo.JPG';
import {TextInput, PasswordInput} from './components.js';


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      name: ""
    };
  }

  Change = (id, value) => {
    this.setState({ [id]: value });
  }

  Submit = event => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name
    };

    axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div className="page" >
        <nav className="header">Sign Up</nav>
        <div className="container">
          <div id="logo">
            <img src={logo} className="logo" alt="logo" />
          </div>
          <form>
            <TextInput id={"Email"} name={"email"} type={"email"} onChange={this.Change}/>
            <PasswordInput text={this.state.password} onChange={this.Change}/>
            <TextInput id={"Name"} name={"name"} type={"text"} text={this.state.name} onChange={this.Change}/>
          </form>
          <div>
            <Button
              id="submit_button"
              type="submit"
              onClick={this.Submit}>
              Signup</Button>
          </div>
        </div>
      </div>
    );
  }
}

