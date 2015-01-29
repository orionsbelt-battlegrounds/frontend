"use strict";

var Router = require('react-router');
var React = require('react');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;

var CurrentUserStore = require('../../stores/CurrentUserStore.js');

function renderGoLogin() {
  return (
    <li>
      <Link to="login">Login</Link>
    </li>
  );
}

function renderUserMenu() {
  return (
    <li>
      <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">{CurrentUserStore.getCurrentUser().username} <b className="caret"></b></a>
      <ul className="dropdown-menu">
        <li><a href="#">Profile</a></li>
        <li className="divider"></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </li>
  );
}

module.exports = React.createClass({

  getInitialState: function() {
    return {user : CurrentUserStore.getCurrentUser()};
  },

  componentDidMount: function() {
    CurrentUserStore.addChangeListener(this.onCurrentUserChanged);
  },

  componentWillUnmount: function() {
    CurrentUserStore.removeChangeListener(this.onCurrentUserChanged);
  },

  onCurrentUserChanged: function onChange() {
    this.setState({user:CurrentUserStore.getCurrentUser()});
  },

  render: function () {
    if(this.state.user) {
      return renderUserMenu();
    } else {
      return renderGoLogin();
    }
  }
});
