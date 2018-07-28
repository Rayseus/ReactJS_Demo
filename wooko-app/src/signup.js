/*This is a test signup page with React JS created by Ruiyang
included functions: react-route set domain address
                    form validation check, email, password confirmation and username
                    post user signup data to https://jsonplaceholder.typicode.com/users with Axios
*/
import React, { Component } from 'react';
import axios from 'axios';
import './signup.css';
import logo from './image/logo.JPG';
import {TextInput, PasswordInput, Button} from './components.js';


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      name: ""
    };
    this.shouldSubmit = false;
  }

  Change = (id, value) => {
    this.setState({ [id]: value });
  }

  Submit = event => {
    if(!this.shouldSubmit)
      return;
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

  validation = (valid) =>{
    this.shouldSubmit = valid;
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
            <TextInput id={"Email"} name={"email"} type={"email"} onChange={this.Change} callback_valid={this.validation}/>
            <PasswordInput onChange={this.Change} callback_valid={this.validation}/>
            <TextInput id={"Name"} name={"name"} type={"text"} onChange={this.Change} callback_valid={this.validation}/>
          </form>
          <div>
            <Button name={'Signup'} onClick={this.Submit} />
          </div>
        </div>
      </div>
    );
  }
}

