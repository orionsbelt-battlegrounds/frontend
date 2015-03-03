"use strict";

var _ = require('mori');
var Router = require('react-router');
var React = require('react');
var mori = require("mori");
var UnitCell = require('../board/UnitCell.react.js');
var GameStore = require('../../stores/GameStore.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    GameStore.addElementSelectedListener(this.onElementSelected);
  },

  componentWillUnmount: function() {
    GameStore.removeElementSelectedListener(this.onElementSelected);
  },

  render: function () {
    var element = this.state.selectedElement;
    var stash = _.getIn(this.props.game, ["board", "stash", this.props.playerCode]);

    var units = _.map(function mapUnits(info) {
      var name = _.get(info, 0);
      var quantity = _.get(info, 1);
      var selected = element && (name === _.get(element, "unit"));
      return (
        <UnitCell key={name}
                  selectable={true}
                  unitName={name}
                  quantity={quantity}
                  selected={selected} />
      );
    }, stash);

    var css = "playerStash " + _.getIn(this.props.game, ["board", "terrain"]);

    return (
      <section className={css}>
        {_.intoArray(units)}
      </section>
    );
  },

  onElementSelected: function elementSelected(element) {
    this.setState({selectedElement:element});
  }

});
