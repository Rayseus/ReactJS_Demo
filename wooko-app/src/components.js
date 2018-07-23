import React, { Component } from 'react';
import StarRating from './starRating.js';
import './components.css';


export default class Components extends Component{
    render(){
        return(
            <div className="page">
                <div className="title"><p>Text Input</p></div>
                    <div id='inputtext'><p>Text Input with Placeholder:</p><TextInput id={"Placeholder"} name={"name"} type={"text"}/></div>
                    <div id='inputtext'><p>Text Input with Text:</p><TextInput id={"Text"} name={"name"} type={"text"}/></div>
                    <div id='inputtext'><p>Text Input with Error:</p>
                        <div className="line">
                            <input style={{borderColor: 'red'}}
                                type={this.props.type}
                                placeholder='Text'/>
                            <p id='error'>Error</p>
                        </div>
                    </div>
                <div className="title"><p>Button</p></div>
                    <div style={{width: '80%'}}><button id='submit_button' style={{margin: '40px 0px'}}>Button</button></div>
                <div className="title"><p>Stars Stick</p></div>
                    <div style={{width: '80%', zoom: '3', margin: '10px 0px'}}>
                        <StarRating 
                        maxStar = {5}
                        rate = {this.props.rate}
                        id = {1}
                        onChange = {(rate) => {this.props.onChange && this.props.onChange(rate)}} />
                    </div>
            </div>
        );
    }
}

export class TextInput extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email: {
            vaild: true,
            error: ''
          },
          name: {
            vaild: true,
            error: ''
          },
      };
    }
  
    handleValidation(field, value, type = 'string') {
  
      switch (field) {
        case 'email': {
          if (value.length === 0) {
            this.setState({email: {vaild: false, error: 'Require Input'}});
          }
          else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({email: {vaild: false, error: 'Invaild Email'}});
          }
          else {
            this.setState({email: {vaild: true, error: ''}});
          }
          break;
        }
        case 'name': {
          if (value.length === 0) {
            this.setState({name: {vaild: false, error: 'Require Input'}});
          }
          else if (value.length > 20) {
            this.setState({name: {vaild: false, error: 'Name should be less than 20'}});
          }
          else {
            this.setState({name: {vaild: true, error: ''}});
          }
          break;
        }
      }
    }
  
    render() {
      return (
        <div className="line">
          <input style={{borderColor:this.state[this.props.name].vaild ? 'rgba(0,0,0,0.42)' : 'red'}}
            type={this.props.type}
            placeholder={this.props.id}
            onChange={event =>{
               this.handleValidation(this.props.name, event.target.value);
               this.props.onChange(this.props.name, event.target.value);
              }}
          />
          <p id='error'>{this.state[this.props.name].error}</p>
        </div>
      );
    }
  }
  
  export class PasswordInput extends Component{
    constructor(props) {
      super(props);
      this.state = {
          password: {
            vaild: true,
            error: ''
          },
          password_confirmation: {
            vaild: true,
            error: ''
          } 
      };
      this.password = "";
      this.comfirmation = "";
    }
  
    handleValidation(field, value, type = 'string') {
      if(field === 'password'){
        this.password = value;
        if(value != this.comfirmation && this.comfirmation != ''){
            this.setState({password_confirmation: {vaild: false, error: 'Password not match'}});
        }
        else{
            this.setState({password_confirmation: {vaild: true, error: ''}});
        }
        if (value.length === 0) {
            this.setState({password: {vaild: false, error: 'Require Input'}});
        }
        else if (value.length < 5 || value.length > 15) {
            this.setState({password: {vaild: false, error: 'Password should be bewteen 5 to 15'}});
        }
        else{
            this.setState({password: {vaild: true, error: ''}});
        }
      }
      else{
        this.comfirmation = value;
        if(value != this.password){
            this.setState({password_confirmation: {vaild: false, error: 'Password not match'}});
        }
        else if (value.length === 0) {
            this.setState({password_confirmation: {vaild: false, error: 'Require Input'}});
        }
        else if (value.length < 5 || value.length > 15) {
            this.setState({password_confirmation: {vaild: false, error: 'Password should be bewteen 5 to 15'}});
        }
        else{
            this.setState({password_confirmation: {vaild: true, error: ''}});
        } 
      }
    } 
    
  
    render() {
      return (
        <div>
        <div className="line">
          <input style={{borderColor:this.state.password.vaild ? 'rgba(0,0,0,0.42)' : 'red'}}      
            type='password'
            placeholder='Password'
            onChange={event =>{
               this.handleValidation('password', event.target.value);
               this.props.onChange('password', event.target.value);
              }}
          />
        </div>
        <div className="line">
          <p id='error'>{this.state.password.error}</p>
        <input style={{borderColor:this.state.password_confirmation.vaild ? 'rgba(0,0,0,0.42)' : 'red'}}
          type='password'
          placeholder='Password Confirmation'
          onChange={event =>{
             this.handleValidation('password_confirmation', event.target.value);
             this.props.onChange('password_confirmation', event.target.value);
            }}
        />
        <p id='error'>{this.state.password_confirmation.error}</p>
      </div>
      </div>
      );
    }
  }