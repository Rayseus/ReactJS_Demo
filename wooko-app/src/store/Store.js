import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import mySaga from '../saga/Saga'
import { postReducer, chatReducer } from '../reducer/Reducer'

const rootReducer = combineReducers({
    postReducer,
    chatReducer
});
const sagaMiddleware = createSagaMiddleware();
// mount saga middleware on the Store
export default createStore(rootReducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(mySaga);