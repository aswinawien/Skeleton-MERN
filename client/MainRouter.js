import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/User";
import SignUp from "./user/SignUp";
import SignIn from "./auth/SignIn";
import PrivateRoute from "./auth/PrivateRoute";
import Profile from "./user/Profile";
import Menu from "./core/Menu";
import EditProfile from "./user/EditProfile";

class MainRouter extends React.Component {
  componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact path={"/"} component={Home} />
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
