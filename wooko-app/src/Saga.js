import { put, call, all, take, takeLatest, fork } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as actions from './actions'
import axios from 'axios';
import firebase from 'firebase';

let postid = 0;
function initFirebase() {
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
function ipAddr(getIp) {
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
function getTime() {
    return new Date().toLocaleString();
}
function fetchData() {
    try {
        return axios.get(`https://jsonplaceholder.typicode.com/posts`)
            .then(res => {
                const contents = res.data.slice(0, 11);  //cut posts to display first 6 posts

                return contents;
            });
    } catch (e) {
        console.log(e);
    }
}
//Redux-saga
function* fetchDataSaga(action) {
    try {
        const data = yield call(fetchData);
        yield put(actions.getData(data));
    } catch (e) {
        console.log(e);
    }
}
export function* MgsSaga() {
    yield takeLatest(actions.REQUEST_DATA, fetchDataSaga);
}

function fetchComment() {
    try {
        return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=` + postid) //match userID and postID
            .then(res => {
                const comment = res.data.slice(0, 3);
                return comment;
            });
    } catch (e) {
        console.log(e);
    }
}
//Redux-saga
function* fetchCommentSaga(action) {
    try {
        postid = action.id;
        console.log('saga', postid);
        const comment = yield call(fetchComment);
        yield put(actions.getCom(comment));
    } catch (e) {
        console.error(e);
    }
}
export function* ComSaga() {
    yield takeLatest(actions.REQUEST_COM, fetchCommentSaga);
}


function createEventChannel() {
    try {
        initFirebase();
        const listener = eventChannel(emit => {
            firebase.database().ref('message/').on('value', (snapshot) => {
                console.log('firebase listener return', snapshot.val())
                emit(snapshot.val() || {})
            });

            return () => firebase.database.ref('message').off(listener);
        });
        return listener;
    } catch (e) {
        console.log(e);
    }
}
function* updateMessage() {
    const updateChannel = createEventChannel();
    while (true) {
        const msg = yield take(updateChannel);
        console.log("meg:", msg);
        yield put(actions.messageReceived(msg));
    }
}
function* fetchMessageSaga(action) {
    try {
        const message = yield call(updateMessage);
    } catch (e) {
        console.log(e);
    }
}
export function* displayMessageSaga() {
    yield takeLatest(actions.REQUEST_MESSAGE, fetchMessageSaga);
}

function* submitMessageSaga(action) {
    try {
        const sentMessage = action.message;
        const ip = yield call(ipAddr);
        console.log('ip',ip);
        firebase.database().ref('message/').push({ context: sentMessage, type: "text", ip: ip, time: getTime() });

        console.log('catch: ', sentMessage);
        yield put(actions.addMessage(sentMessage));
    } catch (e) {
        console.error(e);
    }
}
function* messageSaga() {
    yield takeLatest(actions.GET_MESSAGE, submitMessageSaga);
}

function* submitImageSaga(action) {
    try {
        const sentImage = action.image;
        const ip = yield call(ipAddr);
        firebase.storage().ref('image/' + sentImage.name)
            .put(sentImage)
            .then(() => {
                firebase.storage().ref('image').child(sentImage.name).getDownloadURL().then(url => {
                    const upload = firebase.database().ref('message/').push({ context: url, type: "img", ip: ip, time: getTime() });

                });
            }
            );

        yield put(actions.addMessage(sentImage));
    } catch (e) {
        console.error(e);
    }
}
function* imageSaga() {
    yield takeLatest(actions.GET_IMAGE, submitImageSaga);
}
export default function* mySaga() {
    yield fork(fetchMessageSaga);
    yield all([
        MgsSaga(), ComSaga(), displayMessageSaga(), messageSaga(), imageSaga()
    ])
}