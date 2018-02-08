import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Public from "./pages/Public";
import Profile from "./pages/Profile";
import LoggedInNav  from "./components/LoggedInNav";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute"

const App = () =>
  <Router>
    <div>
      <LoggedInNav />
      <Switch>
        <Route exact path="/" component={Public} />
        <Route exact path="/public" component={Public} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
      <Footer />
    </div>
  </Router>;

export default App;
