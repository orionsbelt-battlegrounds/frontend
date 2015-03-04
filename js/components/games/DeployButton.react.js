"use strict";

var _ = require('mori');
var Router = require('react-router');
var React = require('react');
var mori = require("mori");
var UnitCell = require('../board/UnitCell.react.js');
var GameStore = require('../../stores/GameStore.js');
var ProfileLink = require('../common/ProfileLink.react.js');

module.exports = React.createClass({

  render: function () {
    var game = this.props.game;
    var state = _.getIn(game, ["board", "state"]);
    var stash = _.getIn(game, ["board", "stash", this.props.playerCode]);

    var css = "btn btn-info";
    if("deploy" === state) {
      if(!_.isEmpty(stash)) {
        css = "btn btn-default disabled";
      }
    } else {
      css = "hide";
    }
    return (
      <a href="#" className={css}>Deploy</a>
    );
  }

});
