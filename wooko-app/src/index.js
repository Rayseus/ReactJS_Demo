import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, Redirect } from 'react-router';
import {createBrowserHistory} from 'history';
import Signup from './signup';
import Posts from './post';
import Chat from './chat';
import Components from './components/components';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from "./store/Store";


const history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store}>
    <Router path="/" history={history}>
    <div>
        <Route path="/signup" component={Signup} />
        <Route path="/posts" component={Posts} />
        <Route path="/chat" component={Chat} />
        <Route path="/components" component={Components} />
        {/* <Redirect from="/" to="/signup" /> */}
    </div>
    </Router></Provider>, document.getElementById('root'));
registerServiceWorker();
