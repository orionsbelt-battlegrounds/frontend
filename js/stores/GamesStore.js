"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require("mori");
var gateway = require("../utils/gateway.js");
var CurrentUserStore = require("./CurrentUserStore.js");

var LOBBY_UPDATED_EVENT = "GamesStore#LobbyUpdated";

var lobbyGames = _.vector();

function updateLobby() {
  var user = CurrentUserStore.getCurrentUser();
  gateway.getLobbyGames(user, function onNewLobbyGames(games) {
    lobbyGames = _.toClj(games);
    GamesStore.lobbyUpdated(lobbyGames);
  });
}

setInterval(updateLobby, 2500);

var GamesStore = assign({}, EventEmitter.prototype, {

  getLobbyGames: function getLobbyGames() {
    return lobbyGames;
  },

  lobbyUpdated: function(games) {
    this.emit(LOBBY_UPDATED_EVENT, games);
  },

  addLobbyUpdatedListener: function(callback) {
    this.on(LOBBY_UPDATED_EVENT, callback);
  },

  removeLobbyUpdatedListener: function(callback) {
    this.removeListener(LOBBY_UPDATED_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {
  var actionType = _.get(action, "actionType");
  if(GamesStore[actionType]) {
    GamesStore[actionType](action);
  }
});

module.exports = GamesStore;
