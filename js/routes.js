'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;
var MasterLayout = require('./components/MasterLayout.react.js');

module.exports = (
  <Route name='root' path='/' handler={MasterLayout}>
  </Route>
)
