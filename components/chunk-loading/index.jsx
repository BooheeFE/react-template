import React from 'react';
import s from './index.scss';

const RetryBtn = props => (
  <button className={s.retryBtn} onClick={props.retry}>
    {props.tips}
  </button>
);

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
  if (props.error) {
    return (
      <div className={s.container}>
        <RetryBtn tips="网络链接失败，请重试！" retry={props.retry} />
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div className={s.container}>
        <RetryBtn tips="网络开小差了，请重试！" retry={props.retry} />
      </div>
    );
  } else if (props.pastDelay) {
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