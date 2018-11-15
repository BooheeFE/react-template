import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

import IndexPage from './page/index';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Redirect from="/" to="/"/>
    </Switch>
  </BrowserRouter>
);

export default App;