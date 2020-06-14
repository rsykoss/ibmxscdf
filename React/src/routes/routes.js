import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

/**
 * Import all page components here
 */
// import App from './app';
import CCTV from '../pages/cctv';
// import Home from '../pages/Home';
// import Profile from '../Elderly/Profile';
import Home from '../Elderly/Register';
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