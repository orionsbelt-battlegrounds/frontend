"use strict";

var _ = require('mori');
var React = require('react');
var GamesStore = require('../../stores/GamesStore.js');
var GameActions = require('../../actions/GameActions.js');

var JoinGameLink = React.createClass({

  getInitialState: function() {
    return {creating: false};
  },

  render: function() {
    var disabled = "";
    if(this.state.creating) {
      disabled = "disabled";
    }

    var game = this.props.game;
    return (
      <button onClick={this.onJoinGame} disabled={disabled} type="button" className="btn btn-info">Join</button>
    );
  },

  onJoinGame: function onJoinGame() {
    this.setState({creating: true});
    GameActions.joinGame(this.props.game);
  }

});

module.exports = JoinGameLink;
