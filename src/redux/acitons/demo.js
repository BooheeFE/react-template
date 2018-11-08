/*
 * @desc demo action
 * @author simbawu
 * @date 2018-11-08
 */

import { createActions } from 'redux-actions';
import {DEMO_LIST} from '../actionTypes';

export default createActions({
  [DEMO_LIST]: (list) => {
    return list;
  }
});