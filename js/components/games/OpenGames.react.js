"use strict";

var _ = require('mori');
var React = require('react');
var GamesStore = require('../../stores/GamesStore.js');
var ProfileLink = require('../../components/common/ProfileLink.react.js');
var LobbyGameTr = require('./LobbyGameTr.react.js');

var OpenGames = React.createClass({

  getInitialState: function() {
    return {games:GamesStore.getLobbyGames()};
  },

  componentDidMount: function() {
    GamesStore.addLobbyUpdatedListener(this.onLobbyChanged);
  },

  componentWillUnmount: function() {
    GamesStore.removeLobbyUpdatedListener(this.onLobbyChanged);
  },

  onLobbyChanged: function onLobbyChanges(games) {
    this.setState({games:games});
  },

  render: function() {

    var rows = _.toJs(_.map(function(game) {
      return <LobbyGameTr key={_.get(game, "_id")} game={game} />
    }, this.state.games));

    return (
      <table className="table table-striped table-hover gamesPreview">
        <thead>
          <tr>
            <th>Player</th>
            <th>Rating</th>
            <th>Units</th>
            <th>Type</th>
            <th>Rated?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

});

module.exports = OpenGames;
