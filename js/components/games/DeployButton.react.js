"use strict";

var _ = require('mori');
var Router = require('react-router');
var React = require('react');
var mori = require("mori");
var UnitCell = require('../board/UnitCell.react.js');
var GameStore = require('../../stores/GameStore.js');
var ProfileLink = require('../common/ProfileLink.react.js');
var GameActions = require('../../actions/GameActions.js');

module.exports = React.createClass({

  render: function () {
    var game = this.props.game;
    var stash = _.getIn(game, ["board", "stash", this.props.playerCode]);

    var originalGame = this.props.originalGame;
    var state = _.getIn(originalGame, ["board", "state"]);
    var originalStash = _.getIn(originalGame, ["board", "stash", this.props.playerCode]);

    var css = "btn btn-info";
    if("deploy" === state) {
      if(_.isEmpty(originalStash)) {
        css = "hide";
      } else if(!_.isEmpty(stash)) {
        css = "btn btn-default disabled";
      }
    } else {
      css = "hide";
    }

    return (
      <a onClick={this.click} className={css}>Deploy</a>
    );
  },

  click: function click(ev) {
    GameActions.deployGame(this.props.game);
  }

});
