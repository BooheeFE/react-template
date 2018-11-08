/*
 * @desc demo redux
 * @author simbawu
 * @date 2018-11-08
 */

import { handleActions } from 'redux-actions';
import {DEMO_LIST} from '../actionTypes';
import initialState from '../initialState';

export default handleActions({
  [DEMO_LIST]: (state, action) => {
    return {
      ...state,
      list: action.payload
    };
  }
}, initialState);