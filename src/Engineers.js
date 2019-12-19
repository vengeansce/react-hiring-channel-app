import React from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import Main from "./components/Main";
import Register from "./components/Register";
import Profile from "./components/Profile";

function Engineer() {
  let { id } = useParams();
  return <Profile id={id} />;
}

function Engineers() {
  let match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/signup`}>
        <Register />
      </Route>
      <Route path={`${match.path}/:id`}>
        <Engineer />
      </Route>
      <Route path={match.path}>
        <Main />
      </Route>
    </Switch>
  );
}

export default Engineers;
