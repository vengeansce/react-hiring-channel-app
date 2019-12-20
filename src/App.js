import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Companies from "./Companies";
import Engineers from "./Engineers";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
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
      </div>
    </Router>
  );
}

export default App;
