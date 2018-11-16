/*
 * @desc reudx reducer combine
 * @author simbawu
 * @date 2018-11-08
 */

import { combineReducers } from 'redux';
import demo from './demo';

const combinedReducer = combineReducers({
  demo
});

export default combinedReducer;