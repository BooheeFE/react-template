/*
 * @desc reudx middlewares
 * @author simbawu
 * @date 2018-11-08
 */

import { applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

let middleWare = [];
if (process.env.NODE_ENV !== 'production') {
  middleWare.push(loggerMiddleware);
}

export default applyMiddleware(...middleWare);