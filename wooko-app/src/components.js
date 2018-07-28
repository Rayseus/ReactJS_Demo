import React, { Component } from 'react';
import StarRating from './starRating.js';
import './components.css';


export default class Components extends Component{
    test(){
        console.log("Good");
    }
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
                    <Button name={'Button'} onClick={this.test} />
                    {/* <div style={{width: '80%'}}><button id='submit_button' style={{margin: '40px 0px'}}>Button</button></div> */}
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
            valid: true,
            error: ''
          },
          name: {
            valid: true,
            error: ''
          },
      };
    }
  
    handleValidation(field, value, type = 'string') {
      switch (field) {
        case 'email': {
          if (value.length === 0) {
            this.setState({email: {valid: false, error: 'Require Input'}}, ()=>{this.props.callback_valid(this.state.email.valid)});
          }
          else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            this.setState({email: {valid: false, error: 'Invalid Email'}}, ()=>{this.props.callback_valid(this.state.email.valid)});
          }
          else {
            this.setState({email: {valid: true, error: ''}}, ()=>{this.props.callback_valid(this.state.email.valid)});
          }
          break;
        }
        case 'name': {
          if (value.length === 0) {
            this.setState({name: {valid: false, error: 'Require Input'}}, ()=>{this.props.callback_valid(this.state.name.valid)});
          }
          else if (value.length > 20) {
            this.setState(
                {name: {valid: false, error: 'Name should be less than 20'}}, ()=>{this.props.callback_valid(this.state.name.valid)});
          }
          else {
            this.setState({name: {valid: true, error: ''}}, ()=>{this.props.callback_valid(this.state.name.valid)});
          }
          break;
        }
        default:{
            break;
        }
      }
      
    }

  
    render() {
        return (
            <div className="line">
            <input style={{borderColor:this.state[this.props.name].valid ? 'rgba(0,0,0,0.42)' : 'red'}}
                type={this.props.type}
                placeholder={this.props.id}
                onChange={event =>{
                    if(this.props.onChange){
                        this.handleValidation(this.props.name, event.target.value);
                        this.props.onChange(this.props.name, event.target.value);
                    }
                }}
            />
            <div><p id='error'>{this.state[this.props.name].error}</p></div>
            </div>
        );
        }
    }
  
export class PasswordInput extends Component{

    constructor(props) {
      super(props);
      this.state = {
          password: {
            valid: true,
            error: ''
          },
          password_confirmation: {
            valid: true,
            error: ''
          } 
      };
      this.password = "";
      this.comfirmation = "";
    }
  
    handleValidation(field, value, type = 'string') {
      if(field === 'password'){
        this.password = value;
        if(value !== this.comfirmation && this.comfirmation !== ''){
            this.setState({password_confirmation: {valid: false, error: 'Password not match'}}, ()=>{this.props.callback_valid(this.state.password_confirmation.valid)});
        }
        else{
            this.setState({password_confirmation: {valid: true, error: ''}}, ()=>{this.props.callback_valid(this.state.password_confirmation.valid)});
        }
        if (value.length === 0) {
            this.setState({password: {valid: false, error: 'Require Input'}}, ()=>{this.props.callback_valid(this.state.password.valid)});
        }
        else if (value.length < 5 || value.length > 15) {
            this.setState({password: {valid: false, error: 'Password should be bewteen 5 to 15'}}, ()=>{this.props.callback_valid(this.state.password.valid)});
        }
        else{
            this.setState({password: {valid: true, error: ''}}, ()=>{this.props.callback_valid(this.state.password.valid)});
        }
      }
      else{
        this.comfirmation = value;
        if(value !== this.password){
            this.setState({password_confirmation: {valid: false, error: 'Password not match'}}, ()=>{this.props.callback_valid(this.state.password_confirmation.valid)});
        }
        else if (value.length === 0) {
            this.setState({password_confirmation: {valid: false, error: 'Require Input'}}, ()=>{this.props.callback_valid(this.state.password_confirmation.valid)});
        }
        else if (value.length < 5 || value.length > 15) {
            this.setState({password_confirmation: {valid: false, error: 'Password should be bewteen 5 to 15'}}, ()=>{this.props.callback_valid(this.state.password_confirmation.valid)});
        }
        else{
            this.setState({password_confirmation: {valid: true, error: ''}}, ()=>{this.props.callback_valid(this.state.password_confirmation.valid)});
        } 
      }
    } 
    
  
    render() {
      return (
        <div>
        <div className="line">
          <input style={{borderColor:this.state.password.valid ? 'rgba(0,0,0,0.42)' : 'red'}}      
            type='password'
            placeholder='Password'
            onChange={event =>{
               this.handleValidation('password', event.target.value);
               this.props.onChange('password', event.target.value);
              }}
          />
          <div><p id='error'>{this.state.password.error}</p></div>
        </div>
        <div className="line">
            <input style={{borderColor:this.state.password_confirmation.valid ? 'rgba(0,0,0,0.42)' : 'red'}}
            type='password'
            placeholder='Password Confirmation'
            onChange={event =>{
                this.handleValidation('password_confirmation', event.target.value);
                this.props.onChange('password_confirmation', event.target.value);
                }}
            />
            <div><p id='error'>{this.state.password_confirmation.error}</p></div>
      </div>
      </div>
      );
    }
  }

export class Button extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentWillMount() {
        document.addEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress(event) {
        if (event.keyCode === 13) {
            this.props.onClick();
        }    
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    }

    render() {
        return(
            <div id='submit_button' onClick={this.props.onClick} style={this.props.style}>{this.props.name}</div>
        );
    }

}