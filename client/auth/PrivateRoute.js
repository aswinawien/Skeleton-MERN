import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import authHelper from "./auth-helper";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (authHelper.isAuthenticated) {
        return <Component {...props} />;
      } else {
        return (
          <Redirect
            to={{
              pathname: "/signin",
              state: {
                from: props.location
              }
            }}
          />
        );
      }
    }}
  />
);

export default PrivateRoute;
