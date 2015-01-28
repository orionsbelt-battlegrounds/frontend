var Router = require('react-router');
var React = require('react');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;

var Footer = require('./layouts/Footer.react.js');

var MasterLayout = React.createClass({
  render: function () {
    return (
      <div className='container'>
        <RouteHandler/>
        <Footer/>
      </div>
    );
  }
});

module.exports = MasterLayout;
