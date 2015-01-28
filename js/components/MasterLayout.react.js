var Router = require('react-router');
var React = require('react');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;

var Header = require('./layouts/Header.react.js');
var Footer = require('./layouts/Footer.react.js');

var MasterLayout = React.createClass({
  render: function () {
    return (
      <div>
        <Header/>
        <div className='container'>
          <RouteHandler/>
          <Footer/>
        </div>
      </div>
    );
  }
});

module.exports = MasterLayout;
