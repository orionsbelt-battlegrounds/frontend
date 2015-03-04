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
    var state = _.getIn(game, ["board", "state"])

    var p1 = _.getIn(game, ["p1", "name"]);
    var p2 = _.getIn(game, ["p2", "name"]);

    var css1 = state === "deploy" || state === "p1" ? "active" :"";
    var css2 = state === "deploy" || state === "p2" ? "active" :"";

    if(this.props.playerCode && this.props.playerCode === "p1") {
      p1 = _.getIn(game, ["p2", "name"]);
      p2 = _.getIn(game, ["p1", "name"]);
      css2 = state === "deploy" || state === "p1" ? "active" :"";
      css1 = state === "deploy" || state === "p2" ? "active" :"";
    }

    css1 = "list-group-item " + css1;
    css2 = "list-group-item " + css2;

    return (
      <div className="list-group">
        <ProfileLink username={p1} className={css1}/>
        <ProfileLink username={p2} className={css2}/>
      </div>
    );
  }

});
