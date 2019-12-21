import React from 'react';
import {
  Switch, Route, useRouteMatch, useParams,
} from 'react-router-dom';

import Register from './components/companies/Register';
import Profile from './components/companies/Profile';

function Company() {
  const { id } = useParams();
  return <Profile id={id} />;
}

function Companies() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/signup`}>
        <Register />
      </Route>
      <Route path={`${match.path}/:id`}>
        <Company />
      </Route>
    </Switch>
  );
}

export default Companies;
