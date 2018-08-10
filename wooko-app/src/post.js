/*With React-Redux, Posts and Message two components contain a redux container for passing parameter to their children which is 
View component */

import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import './post.css';
import uparrow from './image/up-arrow.svg';
import downarrow from './image/download.svg';
import StarRating from './components/starRating';
import { requestData, requestCom } from './actions/actions'

//main component for post page, contained Message component
class Posts extends Component {
    //after rendering use lfe circle function to dispatch action to request post data
    componentDidMount() {
        this.props.requestData();
    }

    render() {
        const results = this.props.value ? Object.values(this.props.value) : [];
        console.log(results);
        return (
            <div className="page" >
                <nav className="header">Posts</nav>
                <div className="commentContainer">
                    {results.map(content => {
                        return <MessageWithContainer key={content.id} post={content} />
                    })}
                </div>
            </div>
        );
    }
}

//Message component including toggle function which set show or hide comments, and contain Stars component and Comments component
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.post.id,  //identify each post's rating star, according post's id
            show: false     //indentify whether each post's comments appear or not
        };
    }

    toggleDiv = () => {
        this.props.requestCom(this.props.post.userId);
        const show = this.state.show;
        this.setState({ show: !show });
    }

    render() {
        const comments = this.props.comment ? Object.values(this.props.comment) : [];
        console.log("postid", this.props.post.userId);
        return (
            <div className="posts">
                <div id="title"><p id="text">{this.props.post.title}</p></div>
                <div id="body"><p id="text">{this.props.post.body}</p></div>
                <div id="stars"><StarRating
                    maxStar={5}
                    rate={this.props.rate}
                    id={this.state.id}
                    onChange={(rate) => { this.props.onChange && this.props.onChange(rate) }} />
                </div>
                <div> {this.state.show ?
                    <div id="commentBar"><p id="text">Hide Comments</p><img src={uparrow} className="arrow" onClick={this.toggleDiv} alt="uparrow" /></div> :
                    <div id="commentBar"><p id="text">Show Comments</p><img src={downarrow} className="arrow" onClick={this.toggleDiv} alt="downarrow" /></div>}
                </div>
                <div>{this.state.show ? <Comments comments={comments} postid={this.props.post.userId} key="comments" /> : ""}</div>
            </div>
        );
    }
}

//component with comments which is contained by Message component
class Comments extends Component {
    
    render() {
        console.log("comment:", this.props.comments);
        return (
            <div id="comments">
                {this.props.comments.map(comment => <div id="comment">
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
//listen store's change, set state to view
const mapStateToProps = state => ({ 
    value: state.postReducer.value,
    comment: state.postReducer.comment
});
//action to store for requesting post data
const mapDispatchToPropsData = dispatch =>
    bindActionCreators({requestData}, dispatch);
//action to store for requesting comment data
const mapDispatchToPropsCom = dispatch =>
    bindActionCreators({requestCom}, dispatch);

export default connect(mapStateToProps, mapDispatchToPropsData)(Posts);
export const MessageWithContainer = connect(mapStateToProps, mapDispatchToPropsCom)(Message);

