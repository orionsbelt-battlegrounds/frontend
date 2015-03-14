"use strict";

var _ = require('mori');
var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ErrorAlert = require('../common/ErrorAlert.react.js');
var GameActions = require('../../actions/GameActions.js');
var GameStore = require('../../stores/GameStore.js');
var PlayerStash = require('../board/PlayerStash.react.js');
var Board = require('../board/Board.react.js');
var GameRoaster = require('../games/GameRoaster.react.js')
var DeployButton = require('../games/DeployButton.react.js')
var TurnButton = require('../games/TurnButton.react.js')
var UndoActionButton = require('../games/UndoActionButton.react.js')
var ResetActionsButton = require('../games/ResetActionsButton.react.js')
var ActionPoints = require('../games/ActionPoints.react.js')

var CurrentUserStore = require('../../stores/CurrentUserStore.js');

var GamePage = React.createClass({

  mixins: [ Router.State ],

  getInitialState: function getInitialState() {
    return {loading:true};
  },

  componentDidMount: function() {
    GameStore.addGameLoadedListener(this.onGameLoaded);
    GameActions.loadGame(this.getParams().gameId);
  },

  componentWillUnmount: function() {
    GameStore.removeGameLoadedListener(this.onGameLoaded);
  },

  onGameLoaded: function onGameLoaded(game) {
    this.setState({game:game, loading:false});
  },

  render: function () {

    if(this.state.loading) {
      return (
        <div>Loading...</div>
      );
    }

    var playerCode = GameStore.getCurrentPlayerCode(this.state.game);
    var originalGame = GameStore.originalGame;

    return (
      <div className="row">
        <div className="col-lg-6">
          <Board game={this.state.game} originalGame={originalGame} />
          <PlayerStash playerCode={playerCode} game={this.state.game} />
        </div>
        <div className="col-lg-3">
          <GameRoaster playerCode={playerCode} game={this.state.game} />
          <DeployButton playerCode={playerCode} game={this.state.game} originalGame={originalGame} />

          <ActionPoints game={this.state.game} />

          <UndoActionButton />
          <ResetActionsButton />
          <TurnButton game={this.state.game} />
        </div>
      </div>
    );
  }

});

module.exports = GamePage;
