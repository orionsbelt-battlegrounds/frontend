'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var MasterLayout = require('./components/MasterLayout.react.js');
var ReceptionLayout = require('./components/layouts/ReceptionLayout.react.js');
var LobbyLayout = require('./components/layouts/LobbyLayout.react.js');
var LoginPage = require('./components/pages/LoginPage.react.js');
var OpenGamesPage = require('./components/pages/OpenGamesPage.react.js');

module.exports = (
  <Route name='root' handler={MasterLayout}>
    <Route name='reception' handler={ReceptionLayout}>
      <Route name='login' path='/login' handler={LoginPage} />
    </Route>
    <Route name='lobby' path='/' handler={LobbyLayout} />
  </Route>
)
