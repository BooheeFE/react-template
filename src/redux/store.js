/*
 * @desc reudx store
 * @author simbawu
 * @date 2018-11-08
 */

import { createStore } from 'redux';
import reducers from './reducers';
import initialState from './initialState';

import enhancer from './enhancer';

const store = createStore(reducers, initialState, enhancer);

export default store;