import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import history from '@/histories';
import routers from './routers';
import ChunkLoading from '@/components/chunk-loading';

const Routers = routers.map(route => {
  return (
    <Route
      exact
      path={route.path}
      component={Loadable({
        loader: () =>
          import(/* webpackChunkName: `[request]` */ `../pages/${route.page}`),
        loading: ChunkLoading,
        delay: 300,
        timeout: 10000
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