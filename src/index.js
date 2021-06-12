import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

//import "assets/scss/material-kit-react.scss?v=1.8.0";
import "assets/scss/material-dashboard-pro-react.scss";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/DemoPage/DemoPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";

import AdminLayout from "layouts/Admin.js";

var hist = createBrowserHistory();

hist.listen((location, action) => {
  window.scrollTo(0, 0);
});

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={AdminLayout} />
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/login" render={props => <LoginPage hist={hist} />} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/" component={LandingPage} />

      <Route path="/components" component={Components} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
