'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var DefaultRoute = ReactRouter.DefaultRoute;

var MasterLayout = require('./components/MasterLayout.react.js');
var ReceptionLayout = require('./components/layouts/ReceptionLayout.react.js');
var LobbyLayout = require('./components/layouts/LobbyLayout.react.js');
var LoginPage = require('./components/pages/LoginPage.react.js');
var ProfilePage = require('./components/pages/ProfilePage.react.js');
var CreateFriendlyGamePage = require('./components/pages/CreateFriendlyGamePage.react.js');
var GamePage = require('./components/pages/GamePage.react.js');

module.exports = (
  <Route name='root' handler={MasterLayout}>
    <Route name='reception' handler={ReceptionLayout}>
      <Route name='login' path='/login' handler={LoginPage} />
    </Route>
    <Route name='lobby' path='/' handler={LobbyLayout} />
    <Route name='profile' path='/player/:username' handler={ProfilePage} />
    <Route name='createFriendlyGame' path='/start/friendly-game' handler={CreateFriendlyGamePage} />
    <Route name='game' path='/game/:gameId' handler={GamePage} />
  </Route>
)
