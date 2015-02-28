"use strict";

var _ = require('mori');
var Router = require('react-router');
var React = require('react');
var mori = require("mori");
var UnitCell = require('../board/UnitCell.react.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function () {
    var stash = _.getIn(this.props.game, ["board", "stash", this.props.playerCode]);
    var units = _.map(function mapUnits(info) {
      var name = _.get(info, 0);
      var quantity = _.get(info, 1);
      return (
        <UnitCell key={name} unitName={name} quantity={quantity} />
      );
    }, stash);

    var css = "playerStash " + _.getIn(this.props.game, ["board", "terrain"]);

    return (
      <section className={css}>
        {_.intoArray(units)}
      </section>
    );
  },

  mouseOver: function mouseOver(ev) {
    this.setState({over:true});
  },

  mouseOut: function mouseOut(ev) {
    this.setState({over:false});
  }

});
