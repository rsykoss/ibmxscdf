import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

/**
 * Import all page components here
 */
// import App from './app';
import CCTV from './cctv';
import Home from './Home';
import Profile from './Elderly/Profile';
import Register from './Elderly/Register';
import history from './history';

export default class Routes extends Component {
  render() {
      return (
          <Router history={history}>
              <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/cctv" component={CCTV} />
              </Switch>
          </Router>
      )
  }
}