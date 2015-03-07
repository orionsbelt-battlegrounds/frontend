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
    var actionResults = _.getIn(this.props.game, ["board", "action-results"]);
    var costs = _.map(function results(array) {
      var result = _.get(array, 1);
      return _.get(result, "cost");
    }, actionResults);
    var available = 6 - _.reduce(_.sum, costs);

    var css = "actionPoints label ";
    if(available > 4) {
      css += "label-success";
    } else if(available < 2) {
      css += "label-danger";
    } else {
      css += "label-warning";
    }

    if(!GameStore.isCurrentUserTurn()) {
      css = "hide";
    }
    return (
      <div>
        <span className={css}>{available}</span>
      </div>
    );
  }

});
