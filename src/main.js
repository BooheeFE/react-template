import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './router';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'));

if (module.hot) {
  module.hot.accept(App, function() {
    console.log('Accepting the updated printMe module!');
  });
}