import { createStore, applyMiddleware } from 'redux';
import saga from './saga';
import createSagaMiddleware from '@redux-saga/core';
import reducer from './reducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);
export default store;
