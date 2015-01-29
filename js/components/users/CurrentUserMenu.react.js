"use strict";

var Router = require('react-router');
var React = require('react');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
  render: function () {
    return (
      <Link to="login">Login</Link>
    );
  }
});
