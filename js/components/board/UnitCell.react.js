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
      quantity = <span className="label label-default unit-cell-quantity">10</span>;
    }
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className="units-sprite units-doomer_n unit-cell">
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
