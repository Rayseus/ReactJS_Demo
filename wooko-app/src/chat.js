import React, { Component } from 'react';
import firebase from 'firebase';
import pic from './image/picture.svg';
import './chat.css';
import {Button} from './components.js';

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

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: ''
        }
        var config = {
            apiKey: "AIzaSyB5rz0w3ONHSGt_24XsyY5nkoCKe7yIii4",
            authDomain: "wookoreactdemo.firebaseapp.com",
            databaseURL: "https://wookoreactdemo.firebaseio.com",
            projectId: "wookoreactdemo",
            storageBucket: "wookoreactdemo.appspot.com",
            messagingSenderId: "825911716870"
        };
        firebase.initializeApp(config);


    }
    ipAddr(getIp) {
        return new Promise((resolve) => {
            window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
            var pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
            pc.createDataChannel('');//create a bogus data channel
            pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
            pc.onicecandidate = function (ice) {
                if (ice && ice.candidate && ice.candidate.candidate) {
                    var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                    //console.log(myIP);
                    resolve(myIP)
                    pc.onicecandidate = noop;

                }
            };
        })
    }
    componentDidMount() {
        this.ipAddr().then(myip => this.setState({ ip: myip }));
    }

    render() {
        //console.log(this.state.ip);
        return (
            <div className="page" >
                <nav className="header">Chat</nav>
                <div><Chatroom ip={this.state.ip} /></div>
            </div>
        );
    }
}

class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);

        this.state = {
            message: [],
            key: []
        }

        this.current_msg = '';
    }

    componentDidMount() {
        firebase.database().ref('message/').on('value', (snapshot) => {
            const currentMessage = snapshot.val();
            if (currentMessage != null) {
                //console.log(currentMessage);
                this.setState({
                    message: Object.values(currentMessage)
                },
                    () => {
                        /* when lestest message show up at the bottom, scrollHeight > scrollTop + clientHeight, then we make
                            scrollTop = scrollHeight to scroll the screen to display the new message*/
                        const shouldScroll = this.board_ref.scrollTop + this.board_ref.clientHeight === this.board_ref.scrollHeight;
                        if (!shouldScroll) {
                            this.board_ref.scrollTop = this.board_ref.scrollHeight;
                        }
                    });
            }

        });
    }
    getTime() {
        return new Date().toLocaleString();
    }
    updateMessage(e) {
        this.current_msg = e.target.value;
    }

    submitMessage() {
        if (this.current_msg === '')
            return;
        const upload = firebase.database().ref('message/').push({ context: this.current_msg, type: "text", ip: this.props.ip, time: this.getTime() });
        this.setState({ key: upload.key });
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
        //create store ref upload file
        firebase.storage().ref('image/' + file.name)
            .put(file)
            .then(() => {
                firebase.storage().ref('image').child(file.name).getDownloadURL().then(url => {
                    const upload = firebase.database().ref('message/').push({ context: url, type: "img", ip: this.props.ip, time: this.getTime() });
                    this.setState({ key: upload.key });
                });
            }
            );

    }

    render() {
        const sentMessage = this.state.message.map((obj, index) => {
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
                    return;
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




