"use strict";

var _ = require('mori');
var React = require('react');

var StashPreview = React.createClass({

  render: function() {
    var game = this.props.game;
    var terrain = "terrainPreview " + _.getIn(game, ["board", "terrain"]);
    var stash = _.getIn(game, ["starting-stash", "p1"]);

    var units = _.toJs(_.map(function(unitName){
      var css = "units-small-sprite units-small-"+unitName+"_n";
      return (
        <div key={unitName} className={css}></div>
      );
    }, _.keys(stash)));

    return (
      <div className={terrain}>
        {units}
      </div>
    );
  }

});

module.exports = StashPreview;
