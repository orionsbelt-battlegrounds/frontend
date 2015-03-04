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
    var p1 = _.getIn(game, ["p1", "name"]);
    var p2 = _.getIn(game, ["p2", "name"]);

    if(this.props.playerCode && this.props.playerCode === "p1") {
      p1 = _.getIn(game, ["p2", "name"]);
      p2 = _.getIn(game, ["p1", "name"]);
    }

    return (
      <div className="list-group">
        <ProfileLink username={p1} className="list-group-item"/>
        <ProfileLink username={p2} className="list-group-item"/>
      </div>
    );
  }

});
