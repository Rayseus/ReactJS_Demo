import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import './post.css';
import uparrow from './image/up-arrow.svg';
import downarrow from './image/download.svg';
import StarRating from './starRating.js';


export default class Posts extends Component{
    constructor(props){
        super(props);
        this.state = {contents: []};              
    }

    componentDidMount(){
        axios.get(`https://jsonplaceholder.typicode.com/posts`)
        .then(res => {
            const contents = res.data.slice(0, 5);  //cut posts to display first 5 posts
            this.setState({contents});
        });        
    }
    
    render() {
        return (
            <div className="page" >
                <nav className="header">Posts</nav>
                <div className="commentContainer">                    
                    {this.state.contents.map(content => <Message key={content.id} {...this.state} post={content}/>)}                     
                </div>            
            </div>
        );
      }
}

//Message component including toggle function which set show or hide comments, and contain Stars component and Comments component
class Message extends Component{
    constructor(props){
        super(props);
        this.state = {
                    id: this.props.post.id,  //identify each post's rating star, according post's id
                    show: false};
               
    }
    toggleDiv = () =>{
        const show = this.state.show;
        this.setState({show: !show});
        // console.log(this.props.post.userid);
    }

    render(){
    return(
        <div className="posts">
            <div id="title"><p id="text">{this.props.post.title}</p></div>
            <div id="body"><p id="text">{this.props.post.body}</p></div>
            <div id="stars"><StarRating
                    maxStar = {5}
                    rate = {this.props.rate}
                    id = {this.state.id}
                    onChange = {(rate) => {this.props.onChange && this.props.onChange(rate)}} />
            </div>
            <div> {this.state.show ?
                <div id="commentBar"><p id="text">Hide Comments</p><img src={uparrow} className="arrow" onClick={this.toggleDiv} alt="uparrow" /></div> :
                <div id="commentBar"><p id="text">Show Comments</p><img src={downarrow} className="arrow" onClick={this.toggleDiv} alt="downarrow" /></div>}
            </div>
            <div>{this.state.show ? <Comments postid = {this.props.post.userId} key="comments"/> : ""}</div>
        </div>
    );
    }
}

class Comments extends Component{
    constructor(props){
        super(props);
        this.state = {comment: []};         
    }
    componentDidMount(){
        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=` + this.props.postid) //match userID and postID
        .then(res => {
            const comment = res.data.slice(0, 3);
            this.setState({comment});
        });
        
    }    
    render(){
        return(
            <div id="comments">{this.state.comment.map(comment => <div id="comment">
                                                        <div id="body"><p id="text">{comment.body}</p></div>
                                                        <div id="info">
                                                            <div id="infoD"><p id="text">{comment.email}</p></div>
                                                            <div id="infoD"><p id="text">{comment.name}</p></div>
                                                        </div>
                                                    </div>)}
            </div>
        );
    }
}

