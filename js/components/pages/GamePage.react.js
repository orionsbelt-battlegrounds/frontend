"use strict";

var _ = require('mori');
var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var ErrorAlert = require('../common/ErrorAlert.react.js');
var GameActions = require('../../actions/GameActions.js');
var GameStore = require('../../stores/GameStore.js');
var PlayerStash = require('../board/PlayerStash.react.js');

var CurrentUserStore = require('../../stores/CurrentUserStore.js');

function getCurrentPlayerCode(game) {
  var user = CurrentUserStore.getCurrentUser();
  if(_.get(user, "username") === _.getIn(game, ["p1", "name"])) {
    return "p1";
  }
  return "p2";
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
      <div>
        <PlayerStash playerCode={playerCode} game={this.state.game} />
      </div>
    );
  }

});

module.exports = GamePage;
