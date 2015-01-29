var Router = require('react-router');
var React = require('react');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;

var ReceptionLayout = React.createClass({
  render: function () {
    return (
      <RouteHandler/>
    );
  }
});

module.exports = ReceptionLayout;
