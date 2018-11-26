import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import history from 'histories';
import routers from './routers';

const Loading = () => <div>Loading...</div>;

let Routers = routers.map(route => {
  return (
    <Route
      exact
      path={route.path}
      component={Loadable({
        loader: () => import(`../pages/${route.page}`),
        loading: Loading
      })}
    />
  );
});

const App = () => (
  <Router history={history}>
    <Switch>
      {Routers}
      <Redirect from="/" to="/" />
    </Switch>
  </Router>
);

export default App;