"use strict";

var React = require('react');
var Router = require('react-router');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;


module.exports = React.createClass({

  render: function () {
    if(process.env.NODE_ENV === 'test' ) {
      return (<a href={this.props.to}>{this.props.to}</a>)
    } else {
      return (
        <Link to={this.props.to}>{this.props.children}</Link>
      );
    }
  }

});
