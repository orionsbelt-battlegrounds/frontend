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

var CurrentUserStore = require('../../stores/CurrentUserStore.js');

function getCurrentPlayerCode(game) {
  var user = CurrentUserStore.getCurrentUser();
  var username = _.get(user, "username");
  if(username === _.getIn(game, ["p1", "name"])) {
    return "p1";
  } else if(username === _.getIn(game, ["p2", "name"])) {
    return "p2";
  }
  return null;
}

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

    var playerCode = getCurrentPlayerCode(this.state.game);

    return (
      <div className="row">
        <p>Still working on this. come back in a week. :-)</p>
        <div className="col-lg-6">
          <Board game={this.state.game} />
          <PlayerStash playerCode={playerCode} game={this.state.game} />
        </div>
        <div className="col-lg-3">
          <GameRoaster playerCode={playerCode} game={this.state.game} />
        </div>
      </div>
    );
  }

});

module.exports = GamePage;
