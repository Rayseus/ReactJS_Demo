import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route } from 'react-router';
import {createBrowserHistory} from 'history';
import Signup from './signup.js';
import Posts from './post.js';
import Chat from './chat.js';
import Components from './components.js';
import registerServiceWorker from './registerServiceWorker';


const history = createBrowserHistory();

ReactDOM.render(
    <Router path="/" history={history}>
    <div>
        <Route path="/signup" component={Signup} />
        <Route path="/posts" component={Posts} />
        <Route path="/chat" component={Chat} />
        <Route path="/components" component={Components} />
    </div>
    </Router>, document.getElementById('root'));
registerServiceWorker();
