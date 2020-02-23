import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/User";
import SignUp from "./user/SignUp";
import SignIn from "./auth/SignIn";
import PrivateRoute from "./auth/PrivateRoute";
import Profile from "./user/Profile";

class MainRouter extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path={"/"} component={Profile} />
          <Route path={"/users"} component={Users} />
          <Route path={"/signup"} component={SignUp} />
          <Route path={"/signin"} component={SignIn} />
          <Route path={"/user/:userId"} component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;
