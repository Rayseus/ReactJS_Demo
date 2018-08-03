//import { GET_DATA_ID, GET_DATA_TITLE, GET_DATA_BODY, GET_COM_BODY, GET_COM_EMAIL, GET_COM_NAME } from './actions'
import {GET_DATA, GET_COM} from './actions';


export function postReducer(state = {}, action){
    //console.log('dispatch action:',action);
    switch(action.type){
        case GET_DATA:
            return {...state, value: action.data};
        case GET_COM:
            return {...state, comment: action.com};
        default:
            return state;
    }
}

export function chatReducer(state = {}, action){
    switch (action.type) {
        
        case 'MESSAGE_RECEIVED':
            return {...state, message: action.message};
        default:
            return state;
    }
}