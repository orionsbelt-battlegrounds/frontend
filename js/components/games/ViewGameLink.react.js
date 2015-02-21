"use strict";

var _ = require('mori');
var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var GamesStore = require('../../stores/GamesStore.js');
var GameActions = require('../../actions/GameActions.js');

var ViewGameLink = React.createClass({

  mixins: [Navigation],

  render: function() {
    var game = this.props.game;
    return (
      <button onClick={this.onViewGame} type="button" className="btn btn-default">Go</button>
    );
  },

  onViewGame: function onViewGame(ev) {
    this.transitionTo("game", {gameId: _.get(this.props.game, "_id")});
  }

});

module.exports = ViewGameLink;
