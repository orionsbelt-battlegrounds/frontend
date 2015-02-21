"use strict";

var _ = require('mori');
var React = require('react');
var GamesStore = require('../../stores/GamesStore.js');
var GameActions = require('../../actions/GameActions.js');
var ProfileLink = require('../../components/common/ProfileLink.react.js');
var LobbyGameTr = require('./LobbyGameTr.react.js');
var PlayerGameTr = require('./PlayerGameTr.react.js');

var PlayerGames = React.createClass({

  getInitialState: function() {
    return {games:GamesStore.getPlayerGames()};
  },

  componentDidMount: function() {
    GamesStore.addPlayerGamesUpdatedListener(this.onGamesChanged);
  },

  componentWillUnmount: function() {
    GamesStore.removePlayerGamesUpdatedListener(this.onGamesChanged);
  },

  onGamesChanged: function onLobbyChanges(games) {
    this.setState({games:games});
  },

  render: function() {

    var rows = _.toJs(_.map(function(game) {
      return <PlayerGameTr key={_.get(game, "_id")} game={game} />
    }, this.state.games));

    return (
      <table className="table table-striped table-hover gamesPreview">
        <thead>
          <tr>
            <th>Opponent</th>
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

module.exports = PlayerGames;
