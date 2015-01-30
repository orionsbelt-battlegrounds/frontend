var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var OpenGames = require('../games/OpenGames.react.js');

var LobbyLayout = React.createClass({
  render: function () {
    return (
      <div className="row">
      <ul className="nav nav-tabs">
        <li className="active"><a href="#openGames" data-toggle="tab">Open Games</a></li>
        <li><a href="#yourGames" data-toggle="tab">Your Games</a></li>
      </ul>
      <div id="myTabContent" className="tab-content">
        <div className="tab-pane fade active in" id="openGames">
          <OpenGames />
        </div>
        <div className="tab-pane fade" id="yourGames">
          your games
        </div>
      </div>
      <RouteHandler/>
      </div>
      );
      }
      });

      module.exports = LobbyLayout;
