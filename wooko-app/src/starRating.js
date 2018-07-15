import React, { Component } from 'react';
import PropTypes from 'prop-types';
import star from './image/star.svg';
import emptyStar from './image/star_empty.svg';


export default class StarRating extends Component{
    static propTypes = {
        maxStar: PropTypes.number,
        rate: PropTypes.func,
        onChange: PropTypes.func,
        id: PropTypes.number
    };
    constructor(props){
        super(props);
        this.state = {
            rate: localStorage.getItem(this.props.id)
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.rate !== nextProps.rate){
            this.setState({rate: nextProps.rate});
        }    
    }
    
    Change(index){
        localStorage.setItem(this.props.id, index);
        this.setState({rate: index});
        this.props.onChange && this.props.onChange(this.props.id, index);
    }
 
    render(){
        return(
            <div style={{display:'flex', flexDirection:'row'}}>
            {(() => {
                let stars = [];
                for(let i=1;i<=this.props.maxStar;i++){
                    stars.push(
                        <Star key = {i.toString()}
                        index = {i}
                        blink = {this.state.rate >= i? true:false}
                        onPress = {this.Change.bind(this)} />
                    );
                }
                return stars;
            })()}

            </div>
        );
    }
}

class Star extends Component{
    static propTypes = {
        index: PropTypes.any.isRequired,
        blink: PropTypes.bool,
        onPress: PropTypes.func
    };

    Press(){
        this.props.onPress && this.props.onPress(this.props.index);
    }

    render(){
        return(
            <div onClick={this.Press.bind(this)}>
              {this.props.blink ? <img src={star} width={20} alt="star"/> : <img src={emptyStar} width={20} alt="emptystar"/>}
            </div>
        );
    }
}