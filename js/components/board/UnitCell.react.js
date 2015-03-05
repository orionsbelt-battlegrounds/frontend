"use strict";

var _ = require("mori");
var Router = require('react-router');
var React = require('react');
var mori = require("mori");
var GameActions = require("../../actions/GameActions.js");
var GameStore = require("../../stores/GameStore.js");

function getQuantityPanel(component) {
  var quantity = null;
  if(component.state.over || component.props.selected) {
    quantity = (
      <div>
      <span className="label label-default unit-cell-quantity">{component.props.quantity}</span>
      </div>
    );
  }
  return quantity;
}

function getDirection(component) {
  var direction = component.props.direction || "north";
  return direction[0];
}

function getCss(component) {
  var selected = "";
  if(component.props.selected) {
    selected = "selected";
  }
  var dir = getDirection(component);
  return "units-sprite units-"+component.props.unitName+"_"+dir+" "+selected+" unit-cell";
}

module.exports = React.createClass({

  getInitialState: function() {
    return {over:false};
  },

  render: function () {
    return (
      <div onClick={this.props.selectable ? this.select : null}
           onMouseOver={this.mouseOver}
           onMouseLeave={this.mouseOut}
           className={getCss(this)}>
        {getQuantityPanel(this)}
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
