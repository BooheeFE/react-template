import React from 'react';
import {connect} from 'react-redux';

import api from 'api';
import actions from '../../redux/acitons';
import s from './index.scss';

class IndexPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.initData();
  }

  initData() {
    const {dispatch} = this.props;
    api.getCnodeList().then((res) => {
      dispatch(actions.demoList(res));
    });
  }

  render() {

    return (
      <div className={s.container}>
				Hello World
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(IndexPage);