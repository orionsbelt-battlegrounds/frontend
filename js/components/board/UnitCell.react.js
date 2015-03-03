"use strict";

var _ = require("mori");
var Router = require('react-router');
var React = require('react');
var mori = require("mori");
var GameActions = require("../../actions/GameActions.js");
var GameStore = require("../../stores/GameStore.js");

module.exports = React.createClass({

  getInitialState: function() {
    return {over:false};
  },

  render: function () {
    var quantity = null;
    if(this.state.over || this.props.selected) {
      quantity = (
        <div>
        <span className="label label-default unit-cell-quantity">{this.props.quantity}</span>
        </div>
      );
    }
    var selected = "";
    if(this.props.selected) {
      selected = "selected";
    }
    var config = "units-sprite units-"+this.props.unitName+"_n "+selected+" unit-cell";
    return (
      <div onClick={this.select}
           onMouseOver={this.mouseOver}
           onMouseOut={this.mouseOut}
           className={config}>
        {quantity}
      </div>
    );
  },

  select: function selectUnit(ev) {
    GameActions.unitSelected({
      unit: this.props.unitName,
      quantity: this.props.quantity
    });
  },

  mouseOver: function mouseOver(ev) {
    this.setState({over:true});
  },

  mouseOut: function mouseOut(ev) {
    this.setState({over:false});
  }

});
