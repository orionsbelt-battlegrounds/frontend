var React = require('react');
var title = "Orion's Belt BattleGrounds";
var Router = require('react-router');
var Route = Router.Route, DefaultRoute = Router.DefaultRoute,
            RouteHandler = Router.RouteHandler;

var CurrentUserMenu = require('../users/CurrentUserMenu.react.js');
var Link = require('../common/Link.react.js');

var Header = React.createClass({
  render: function () {
    return (
      <div className="navbar navbar-default navbar-fixed-top">
        <div className="container">

          <div className="navbar-header">
            <Link to="lobby" activeClassName="logoActive" className="navbar-brand">{title}</Link>
            <ul className="nav navbar-nav">
              <li><Link to="lobby" token="Lobby" /></li>
            </ul>
          </div>

          <div className="navbar-collapse collapse" id="navbar-main">
          {/*<ul className="nav navbar-nav">
              <li><a href="../help/">Help</a></li>
            </ul>*/}

            <ul className="nav navbar-nav navbar-right">
              <CurrentUserMenu />
            </ul>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header;
