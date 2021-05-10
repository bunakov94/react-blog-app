import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }: any) => (
  <Route {...rest} render={(props) => (auth === false ? <Redirect to="/sign-in" /> : <Component {...props} />)} />
);
export default PrivateRoute;
