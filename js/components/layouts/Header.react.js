var React = require('react');
var title = "Orion's Belt BattleGrounds";
var Router = require('react-router');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            Link=Router.Link, RouteHandler = Router.RouteHandler;

var CurrentUserMenu = require('../users/CurrentUserMenu.react.js');

var Header = React.createClass({
  render: function () {
    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">{title}</a>
            <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="navbar-collapse collapse" id="navbar-main">
          {/*<ul className="nav navbar-nav">
              <li><a href="../help/">Help</a></li>
            </ul>*/}

            <ul className="nav navbar-nav navbar-right">
              <li><CurrentUserMenu /></li>
            </ul>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
