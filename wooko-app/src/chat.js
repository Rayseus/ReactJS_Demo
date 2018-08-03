import React, { Component } from 'react';
import pic from './image/picture.svg';
import './chat.css';
import {Button} from './components.js';
//add redux-saga
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getMessage, getImage, requestMessage } from './actions'

const BUTTON_STYLE = {
    height: '40px',
    width: '120px',
    background: '#CE3E3E',
    borderRadius: '16px',
    fontFamily: 'Avenir-Heavy',
    fontSize: '16px',
    color: '#FFFFFF',
    margin: '0px 0px'
}


export class Chat extends Component {

    render() {
        console.log('render messgae', this.props.message);
        
        const results = this.props.message ? Object.values(this.props.message) : [];
        console.log(results);
        return (
            <div className="page" >
                <nav className="header">Chat</nav>
                <div><ChatroomWithContainer msg={results} /></div>
            </div>
        );
    }
}

class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);

        this.current_msg = '';
    }
    componentDidUpdate(){
        /* when lestest message show up at the bottom, scrollHeight > scrollTop + clientHeight, 
        then we make scrollTop = scrollHeight to scroll the screen to display the new message*/
        const shouldScroll = this.board_ref.scrollTop + this.board_ref.clientHeight === this.board_ref.scrollHeight;
        if (!shouldScroll) {
            this.board_ref.scrollTop = this.board_ref.scrollHeight;
        }
    }

    updateMessage(e) {
       this.current_msg = e.target.value;  
    }

    submitMessage() {
        console.log("msg", this.current_msg);
        if (this.current_msg === '')
            return;
        this.props.getMessage(this.current_msg);
        this.input_ref.value = '';
        this.current_msg = '';
    }
    clickInput = () => {
        this.input_img.click();
    }
    uploadImg = (e) => {
        //get file
        let file = e.target.files[0];
        if (file === null)
            return;
        this.props.getImage(file);
    }

    render() {
        const sentMessage = this.props.msg.map((obj, index) => {
            switch (obj.type) {
                case 'text':
                    return (obj.context && <div key={index} id="context">
                        <p id="text">{obj.context}</p>
                        <span>{obj.ip}  -  {obj.time}</span>
                    </div>);                    
                case 'img':
                    return (obj.context && <div key={index} id="context">
                        <img src={obj.context} alt="Uploaded images" height="50" width="50" />
                        <span>{obj.ip}  -  {obj.time}</span>
                    </div>);                   
                default:
                    return null;
            }
        });
        
        return (
            <div className="chatspace">
                <div id="board" ref={ref => this.board_ref = ref}>
                    {sentMessage}
                </div>
                <div className="controlBar">
                    <input ref={abc => this.input_ref = abc} type="text" placeholder="Say something..." onChange={this.updateMessage} />
                    <Button name={'Send'} onClick={this.submitMessage} style={BUTTON_STYLE}/>
                    <img id="pic" src={pic} alt="sentPic" onClick={this.clickInput} />
                    <input ref={ip => this.input_img = ip} style={{ display: 'none' }} type="file" onChange={this.uploadImg} />
                </div>
            </div>
        );
    }
}

//listen store's change, set state to view
const mapStateToProps = state => {
    console.log('message in state',  state,state.chatReducer.message)
    return{ 
    message: state.chatReducer.message,
}
;}
//action to store
const mapDispatchToPropsData = dispatch =>
    bindActionCreators({requestMessage}, dispatch);

const mapDispatchToPropsMgs = dispatch =>
    bindActionCreators({getMessage, getImage, requestMessage}, dispatch);


export default connect(mapStateToProps, mapDispatchToPropsData)(Chat);
export const ChatroomWithContainer = connect(mapStateToProps, mapDispatchToPropsMgs)(Chatroom);


