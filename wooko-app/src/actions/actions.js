//Actions for Post
export const REQUEST_DATA = "REQUEST_DATA";
export const REQUEST_COM = "REQUEST_COM"
export const GET_DATA = "GET_DATA";
export const GET_COM = "GET_COM";
export const GET_POSTID = "GET_POSTID";

export const requestData = () => ({type: REQUEST_DATA});
export const requestCom = (id) => ({type: REQUEST_COM, id});
export const getData = (data) => ({type: GET_DATA, data});
export const getCom = (com) => ({type: GET_COM, com});

//Actions for Chat
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_IMAGE = 'ADD_IMAGE';
export const REQUEST_MESSAGE = 'REQUEST_MESSAGE';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const GET_MESSAGE = 'GET_MESSAGE';
export const GET_IMAGE = 'GET_IMAGE';

export const addMessage = (currentMgs) => ({
    type: ADD_MESSAGE,
    currentMgs
});
export const addImage = (image) => ({
    type: ADD_IMAGE,
    image
});
export const requestMessage = () => ({
    type: REQUEST_MESSAGE
});
export const messageReceived = (message) => ({
    type: MESSAGE_RECEIVED,
    message
});

export const getMessage = (message, ip) => ({
    type: GET_MESSAGE,
    message,
    ip
});
export const getImage = (image, ip) => ({
    type: GET_IMAGE,
    image,
    ip
})
