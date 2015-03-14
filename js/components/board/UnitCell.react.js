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

function wrapMoved(component) {
  return (
    <div>
      <div className="moved"></div>
      {rawUnit(component)}
    </div>
  );
}

function wrapEnemy(component) {
  var damageTakenPanel = null;
  if(component.props.damageTaken || component.props.overed) {
    damageTakenPanel = (
      <div className="damageTaken">
        <span className="label label-danger unit-cell-quantity">{component.props.quantity}</span>
      </div>
    );
  }
  return (
    <div>
      <div className="enemy"></div>
      {rawUnit(component)}
      {damageTakenPanel}
    </div>
  );
}

function wrapSelected(component) {
  return (
    <div>
      <div className="unitSelected"></div>
      {rawUnit(component)}
    </div>
  );
}

function rawUnit(component) {
  return (
    <div onClick={component.props.selectable ? component.select : null}
         onMouseOver={component.mouseOver}
         onMouseLeave={component.mouseOut}
         className={getCss(component)}>
      {getQuantityPanel(component)}
    </div>
  );
}

module.exports = React.createClass({

  getInitialState: function() {
    return {over:false};
  },

  render: function () {
    if(this.props.enemy) {
      return wrapEnemy(this);
    } else if(this.props.selected) {
      return wrapSelected(this);
    } else if(this.props.moved || this.props.damageGiven) {
      return wrapMoved(this);
    }
    return rawUnit(this);
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
