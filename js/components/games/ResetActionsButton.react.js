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
    var css = "btn btn-default";
    if(_.isEmpty(GameStore.currentActions)) {
      css += " disabled";
    }
    return (
      <a onClick={this.click} className={css}>Reset</a>
    );
  },

  click: function click(ev) {
    GameActions.resetActions();
  }

});
