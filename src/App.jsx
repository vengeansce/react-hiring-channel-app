import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Companies from './Companies';
import Engineers from './Engineers';
import Login from './components/Login';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/companies">
            <Companies />
          </Route>
          <Route path="/engineers">
            <Engineers />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
