import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Engineers from "./Engineers";
import Account from "./components/Account";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/engineers">
            <Engineers />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
