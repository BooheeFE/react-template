import React from 'react';
import {
  BrowserRouter,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';

import Index from './page/index/index.jsx';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Redirect from="/" to="/"/>
    </Switch>
  </BrowserRouter>
);

export default App;