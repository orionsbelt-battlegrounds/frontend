'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var MasterLayout = require('./components/MasterLayout.react.js');
var ReceptionLayout = require('./components/layouts/ReceptionLayout.react.js');
var LoginPage = require('./components/pages/LoginPage.react.js');

module.exports = (
  <Route name='root' path='/' handler={MasterLayout}>
    <Route name='reception' path='/' handler={ReceptionLayout}>
      <Route name='login' path='/login' handler={LoginPage} />
    </Route>
  </Route>
)
