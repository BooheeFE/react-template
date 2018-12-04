/*
 * @Desc: chunk 懒加载loading组件
 * @Author: simbawu
 * @Date: 2018-12-04 10:29:22
 * @LastEditors: simbawu
 * @LastEditTime: 2018-12-04 23:13:24
 */
import React from 'react';
import s from './index.scss';

const RetryBtn = props => {
  const { retry, tips } = props;
  return (
    <button className={s.retryBtn} onClick={retry}>
      {tips}
    </button>
  );
};

const Loading = () => (
  <div className={s.ldsSpinner}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

const chunkLoading = props => {
  const { retry, error, timedOut, pastDelay } = props;
  if (error) {
    return (
      <div className={s.container}>
        <RetryBtn tips="网络链接失败，请重试！" retry={retry} />
      </div>
    );
  } else if (timedOut) {
    return (
      <div className={s.container}>
        <RetryBtn tips="网络开小差了，请重试！" retry={retry} />
      </div>
    );
  } else if (pastDelay) {
    return (
      <div className={s.container}>
        <Loading />
      </div>
    );
  } else {
    return null;
  }
};

export default chunkLoading;