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

var password_index = "";
export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {form: {
                      email: {
                            text: "",
                            vaild: false,
                            error: ""
                            },
                      password: {
                            text: "",
                            vaild: false,
                            error: "" 
                            },
                      password_c: {
                            text: "",
                            vaild: false,
                            error: ""
                      },
                      name: {
                            text: "",
                            vaild: false,
                            error: ""
                            },
                      }
                    };
        
    }

    handleValidation(field, value, type='string') {
      if(type === 'number'){
        value = +value;
      }
      const {form} = this.state;
      const newFieldObj = {text: value, valid: true, error: ""};

      switch(field){
        case 'email': {
          if(value.length === 0){
            newFieldObj.error = 'Require input';
            newFieldObj.valid = false;
          }
          else if(!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
            newFieldObj.error = 'Invaild Email';
            newFieldObj.valid = false;
          }
          else{
            newFieldObj.error = '';
            newFieldObj.valid = true;
          }
          break;
        }
        case 'password': {
          password_index = value;
          if(value.length === 0){
            newFieldObj.error = 'Require input';
            newFieldObj.valid = false;
          }
          else if(value.length < 5 || value.length > 15){
            newFieldObj.error = 'Password should be bewteen 5 to 15';
            newFieldObj.valid = false;
          }
          else{
            newFieldObj.error = '';
            newFieldObj.valid = true;
          }
          break;
        }

        case 'password_c': {
          if(value.length === 0){
            newFieldObj.error = 'Require input';
            newFieldObj.valid = false;
          }
          else if(value != password_index){
            newFieldObj.error = 'Password not match';
            newFieldObj.valid = false;
          }
          else{
            newFieldObj.error = '';
            newFieldObj.valid = true;
          }
          break;
        }

        case 'name': {
          if(value.length === 0){
            newFieldObj.error = 'Require input';
            newFieldObj.valid = false;
          }
          else if(value.length > 20){
            newFieldObj.error = 'Name should be less than 20';
            newFieldObj.valid = false;
          }
          else{
            newFieldObj.error = '';
            newFieldObj.valid = true;
          }
          break;
        }
      }

      this.setState({form:{
                      ...form,
                      [field]: newFieldObj
                    }
      });
    }

    Change = event =>{
        this.setState({[event.target.id]: event.target.value});
    }

    Submit = event =>{
        event.preventDefault();

        const {form:{email, password, password_c, name}} = this.state;

        const user = {
          email: this.state.form.email.text,
          password: this.state.form.password.text,
          name: this.state.form.name.text
        };

        axios.post(`https://jsonplaceholder.typicode.com/users`, { user })
          .then(res => {
          console.log(res);
          console.log(res.data);
        })
      }
      
    render(){
        const {form:{email, password, password_c, name}} = this.state;
        return (
          <div className="page" >
            <nav className="header">Sign Up</nav>
            <div className="container">
              <img src={logo} className="logo" alt="logo" />

            <form><FormGroup>
            <div className="line">
              <FormControl
              type="email"
              id="email"
              value={email.text}
              placeholder="Email"
              onChange={event => this.handleValidation('email', event.target.value)}
              />
              <FormControl.Feedback />
              <p id='error'>{this.state.form.email.error}</p>
              <FormControl
              type="password"
              id="password"
              value={password.text}
              placeholder="Password"
              onChange={event => this.handleValidation('password', event.target.value)}
              />
              <FormControl.Feedback />
              <p id='error'>{this.state.form.password.error}</p>
              <FormControl
              type="password"
              value={password_c.text}
              placeholder="Password Confirmation"
              onChange={event => this.handleValidation('password_c', event.target.value)}
              />
              <FormControl.Feedback />
              <p id='error'>{this.state.form.password_c.error}</p>
              <FormControl
              type="text"
              id="name"
              value={name.text}
              placeholder="Name"
              onChange={event => this.handleValidation('name', event.target.value)}
              />
              <FormControl.Feedback />
              <p id='error'>{this.state.form.name.error}</p>
              </div>
              <Button
                className="btn btn-primary"
                id="submit_button"
                type="submit"
                onClick={this.Submit}
                >
                Signup
              </Button>
              </FormGroup>
      </form>
            </div>
          </div>
        );
    }
}

{/* <ul><input
                className="line-email"
                id="email"
                type="email"
                placeholder="Email"
                onChange={this.Change}
              /></ul> */}
              {/* <ul><input
                className="line-password"
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.Change}
              /></ul> 
              ul><input
                className="line-passwordC"
                id="password_confirmation"
                type="password"
                placeholder="Password Confirmation"
                onChange={this.Change}
              /></ul>
              <ul><input
                className="line-name"
                id="name"
                type="text"
                placeholder="Name"
                onChange={this.Change}
              /></ul> */}