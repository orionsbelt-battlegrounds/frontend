"use strict";

var Router = require('react-router');
var React = require('react');

var Link = require('../common/Link.react.js');
var CurrentUserActions = require('../../actions/CurrentUserActions.js');
var CurrentUserStore = require('../../stores/CurrentUserStore.js');
var ProfileLink = require('../../components/common/ProfileLink.react.js');

function renderGoLogin() {
  return (
    <li className="noUser">
      <Link to="login">Login</Link>
    </li>
  );
}

function renderUserMenu(component) {
  return (
    <li className="withUser">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">{CurrentUserStore.getCurrentUser().username} <b className="caret"></b></a>
      <ul className="dropdown-menu">
        <li><ProfileLink token="Profile" username={component.state.user.username} /></li>
        <li className="divider"></li>
        <li><a onClick={component.onLogout} href="#">Logout</a></li>
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
      return renderUserMenu(this);
    } else {
      return renderGoLogin();
    }
  },

  onLogout: function onLogout() {
    CurrentUserActions.logout();
  }
});
