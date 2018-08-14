import { createStore, applyMiddleware, compose } from 'redux';
import { initCanCan } from 'redux-cancan';
import thunk from 'redux-thunk';
import rootreducer from './../reducers';

const initialState = {}

const store = createStore(
  rootreducer,
  initialState,
  compose(applyMiddleware(thunk),
    ));
initCanCan(store, require('./../config/ability'));

export default store;
