"use strict";

var React = require('react');
var Router = require('react-router');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;


module.exports = React.createClass({

  render: function () {
    var text = this.props.children || this.props.token;
    if(process.env.NODE_ENV === 'test' ) {
      return (<a href={this.props.to}>{text}</a>)
    } else {
      return (
        <Link to={this.props.to}
              className={this.props.className}
              activeClassName={this.props.activeClassName || "active"}>
          {text}
        </Link>
      );
    }
  }

});
