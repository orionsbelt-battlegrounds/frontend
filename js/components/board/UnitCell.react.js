"use strict";

var Router = require('react-router');
var React = require('react');
var mori = require("mori");

module.exports = React.createClass({

  getInitialState: function() {
    return {over:false};
  },

  render: function () {
    var quantity = null;
    if(this.state.over) {
      quantity = (
        <div>
        <span className="label label-default unit-cell-quantity">{this.props.quantity}</span>
        </div>

      );
    }
    var config = "units-sprite units-"+this.props.unitName+"_n unit-cell";
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className={config}>
        {quantity}
      </div>
    );
  },

  mouseOver: function mouseOver(ev) {
    this.setState({over:true});
  },

  mouseOut: function mouseOut(ev) {
    this.setState({over:false});
  }

});
