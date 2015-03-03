"use strict";

var Router = require('react-router');
var React = require('react');
var _ = require("mori");

var UnitCell = require('../board/UnitCell.react.js');
var GameStore = require('../../stores/GameStore.js');

module.exports = React.createClass({

  getInitialState: function() {
    return {data: _.hashMap()};
  },

  componentDidMount: function() {
    GameStore.addElementSelectedListener(this.onElementSelected);
  },

  componentWillUnmount: function() {
    GameStore.removeElementSelectedListener(this.onElementSelected);
  },

  render: function () {
    var css = "board " + _.getIn(this.props.game, ["board", "terrain"]);
    var board = this;

    var rows = _.map(function mapRows(y) {
      var columns = _.map(function mapColumns(x) {
        var key = (x+1)+":"+(y+1);
        var body = "";
        var selectedElement = _.get(board.state.data, "selectedElement");
        if(selectedElement && key === _.get(board.state.data, "overedCoordinate")) {
          body = (
            <UnitCell key={name}
                      selectable={false}
                      unitName={_.get(selectedElement, "unit")}
                      quantity={_.get(selectedElement, "quantity")}
                      selected={true} />
          );
        }

        return (
          <td key={key}
              onMouseOver={board.mouseOver.bind(board, key)}
              onMouseLeave={board.mouseOut.bind(board, key)}>
            {body}
          </td>
        );
      }, _.range(8));

      return (<tr key={y+1}>{_.intoArray(columns)}</tr>);
    }, _.range(8));

    return (
      <div className={css}>
        <table>
          {_.intoArray(rows)}
        </table>
      </div>
    );
  },

  onElementSelected: function elementSelected(element) {
    var newState = _.assoc(this.state.data, "selectedElement", element);
    this.setState({data:newState});
  },

  mouseOver: function mouseOver(key) {
    var newState = _.assoc(this.state.data, "overedCoordinate", key);
    this.setState({data:newState});
  },

  mouseOut: function mouseOut(ev) {
    var newState = _.dissoc(this.state.data, "overedCoordinate");
    this.setState({data:newState});
  }

});

