"use strict";

var Router = require('react-router');
var React = require('react');
var _ = require("mori");

module.exports = React.createClass({

  render: function () {
    var css = "board " + _.getIn(this.props.game, ["board", "terrain"]);

    var rows = _.map(function mapRows(y) {
      var columns = _.map(function mapColumns(x) {
        return <td key={x+1}></td>;
      }, _.range(8));

      return (<tr key={y+1}>{_.intoArray(columns)}</tr>);
    }, _.range(8));
      console.log(_.intoArray(rows));

    return (
      <div className={css}>
        <table>
          {_.intoArray(rows)}
        </table>
      </div>
    );
  }

});

