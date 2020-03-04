import React from 'react';
import { connect } from 'react-redux';

import Api from '@/api';
import Actions from '@/actions';
import s from './index.scss';

class IndexPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    const { dispatch } = this.props;
    Api.getCnodeList().then(res => {
      dispatch(Actions.demoList(res));
    });
  }

  render() {
    return <div className={s.container}>Hello World</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(IndexPage);