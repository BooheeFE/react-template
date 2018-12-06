/*
 * @Desc: reudx middlewares
 * @Author: simbawu
 * @Date: 2018-11-26 19:01:53
 * @LastEditors: simbawu
 * @LastEditTime: 2018-12-06 19:54:59
 */
import {
  applyMiddleware
} from 'redux';
import {
  createLogger
} from 'redux-logger';

const loggerMiddleware = createLogger();

let middleWare = [];
if (process.env.NODE_ENV !== 'production') {
  middleWare.push(loggerMiddleware);
}

export default applyMiddleware(...middleWare);