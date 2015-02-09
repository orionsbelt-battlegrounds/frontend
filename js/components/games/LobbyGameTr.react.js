"use strict";

var _ = require('mori');
var React = require('react');
var GamesStore = require('../../stores/GamesStore.js');
var ProfileLink = require('../../components/common/ProfileLink.react.js');
var StashPreview = require('./StashPreview.react.js');
var JoinGameLink = require('./JoinGameLink.react.js');

var LobbyGameTr = React.createClass({

  render: function() {
    var game = this.props.game;
    var username = _.getIn(game, ["p1", "name"]);
    return (
      <tr>
        <td><ProfileLink username={username} /></td>
        <td></td>
        <td className="unitRoaster"><StashPreview game={game} /></td>
        <td></td>
        <td>Casual</td>
        <td className="unitRoaster"><JoinGameLink game={game}/></td>
      </tr>
    );
  }

});

module.exports = LobbyGameTr;
