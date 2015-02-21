"use strict";

var _ = require('mori');
var React = require('react');
var GamesStore = require('../../stores/GamesStore.js');
var CurrentUserStore = require('../../stores/CurrentUserStore.js');
var ProfileLink = require('../../components/common/ProfileLink.react.js');
var StashPreview = require('./StashPreview.react.js');
var ViewGameLink = require('./ViewGameLink.react.js');

function getOpponent(user, game) {
  if(_.get(user, "username") === _.getIn(game, ["p1", "name"])) {
    return _.getIn(game, ["p2", "name"]);
  }
  return _.getIn(game, ["p1", "name"]);
}

var PlayerGameTr = React.createClass({

  render: function() {
    var game = this.props.game;
    var currentUser = CurrentUserStore.getCurrentUser();
    var opponent = getOpponent(currentUser, game);
    return (
      <tr>
        <td><ProfileLink username={opponent} /></td>
        <td></td>
        <td className="unitRoaster"><StashPreview game={game} /></td>
        <td></td>
        <td>Casual</td>
        <td className="unitRoaster"><ViewGameLink game={game}/></td>
      </tr>
    );
  }

});

module.exports = PlayerGameTr;
