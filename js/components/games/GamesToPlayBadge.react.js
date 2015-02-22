"use strict";

var _ = require('mori');
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var GamesStore = require('../../stores/GamesStore.js');
var CurrentUserStore = require('../../stores/CurrentUserStore.js');

function verifyTurn(game, state, p1, p2, user) {
  if(state === "p1" && p1 === user) {
    return true;
  }
  if(state === "p2" && p2 === user) {
    return true;
  }
  return false;
}

function verifyDeploy(game, state, p1, p2, user) {
  var stash1 = _.getIn(game, ["board", "stash", "p1"]);
  var stash2 = _.getIn(game, ["board", "stash", "p2"]);

  if(user === p1) {
    return !_.isEmpty(_.keys(stash1));
  }
  return !_.isEmpty(_.keys(stash2));
}

function verifyTimeToPlay(game) {
  var state = _.getIn(game, ["board", "state"]);
  var p1 = _.getIn(game, ["p1", "name"]);
  var p2 = _.getIn(game, ["p2", "name"]);
  var user = _.get(CurrentUserStore.getCurrentUser(), "username");
  if(state === "deploy") {
    return verifyDeploy(game, state, p1, p2, user);
  }
  verifyTurn(game, state, p1, p2, user);
  return false;
}

var GamesToPlayBadge = React.createClass({

  getInitialState: function getInitialState() {
    return {count: 0};
  },

  componentDidMount: function() {
    GamesStore.addPlayerGamesUpdatedListener(this.onUpdate);
  },

  componentWillUnmount: function() {
    GamesStore.removePlayerGamesUpdatedListener(this.onUpdate);
  },

  onUpdate: function onUpdate(games) {
    var checkTimeToPlay = _.map(verifyTimeToPlay, games);
    var count = _.reduce(function(acc, curr) {
      return acc + (curr ? 1 : 0);
    }, 0, checkTimeToPlay);
    this.setState({count:count});
  },

  render: function () {
    if(this.state.count > 0) {
      return (
        <span className="label label-warning">{this.state.count}</span>
      );
    } else {
      return <span/>;
    }
  }

});

module.exports = GamesToPlayBadge;
