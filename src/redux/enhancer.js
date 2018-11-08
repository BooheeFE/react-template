/*
 * @desc redux enhancer
 * @author simbawu
 * @date 2018-11-08
 */

import { compose } from 'redux';

import middleWares from './middlewares';

let composeEnhancers = null;

if (process.env.NODE_ENV !== 'production') {
  composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
} else {
  composeEnhancers = compose;
}

export default composeEnhancers(middleWares);