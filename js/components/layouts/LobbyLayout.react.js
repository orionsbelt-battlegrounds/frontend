var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var OpenGames = require('../games/OpenGames.react.js');

var LobbyLayout = React.createClass({
  render: function () {
    return (
      <div className="row">
        <div className="col-lg-9">
          <ul className="nav nav-tabs">
            <li className="active"><a href="#openGames" data-toggle="tab">Open Games</a></li>
            <li><a href="#yourGames" data-toggle="tab">Your Games <span className="label label-warning">3 games to play</span></a></li>
          </ul>
          <div id="myTabContent" className="tab-content">
            <div className="tab-pane fade active in" id="openGames">
              <OpenGames />
            </div>
            <div className="tab-pane fade" id="yourGames">
              your games
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <a href="#" className="btn btn-primary">Create game</a>
        </div>
      </div>
    );
  }
});

module.exports = LobbyLayout;
