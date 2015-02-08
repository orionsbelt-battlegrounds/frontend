"use strict";

var _ = require('mori');
var React = require('react');
var GamesStore = require('../../stores/GamesStore.js');
var ProfileLink = require('../../components/common/ProfileLink.react.js');

var LobbyGameTr = React.createClass({

  render: function() {
    var game = this.props.game;
    var username = _.getIn(game, ["p1", "name"]);
    var terrain = "terrainPreview " + _.getIn(game, ["board", "terrain"]);
    return (
      <tr>
        <td><ProfileLink username={username} /></td>
        <td></td>
        <td className="unitRoaster">
          <div className={terrain}>
            <div className="units-small-sprite units-small-raptor_n"></div>
            <div className="units-small-sprite units-small-nova_n"></div>
            <div className="units-small-sprite units-small-heavyseeker_n"></div>
          </div>
        </td>
        <td></td>
        <td>Casual</td>
        <td className="unitRoaster"><a href="#" className="btn btn-info">Join</a></td>
      </tr>
    );
  }

});

module.exports = LobbyGameTr;
