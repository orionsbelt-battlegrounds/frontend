"use strict";

var AppDispatcher = require('../dispatcher/AutoAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Router = require('../utils/router.js');
var assign = require('object-assign');
var debounce = require('debounce');
var _ = require("mori");
var gateway = require("../utils/gateway.js");
var CurrentUserStore = require("./CurrentUserStore.js");

var LOBBY_UPDATED_EVENT = "GamesStore#LobbyUpdated";
var PLAYER_GAMES_UPDATED_EVENT = "GamesStore#PlayerGamesUpdated";

var lobbyGames = _.vector();
var playerGames = _.vector();

var updateLobby = debounce(function updateLobby() {
  if(GamesStore.listeners(LOBBY_UPDATED_EVENT).length === 0 ) {
    return;
  }
  var user = CurrentUserStore.getCurrentUser();
  gateway.getLobbyGames(user, function onNewLobbyGames(games) {
    lobbyGames = _.toClj(games);
    GamesStore.lobbyUpdated(lobbyGames);
  });
  gateway.getPlayerGames(user, function onNewPlayerGames(games) {
    playerGames = _.toClj(games);
    GamesStore.playerGamesUpdated(playerGames);
  });
}, 2500, true);

setInterval(updateLobby, 2500);

function onGameJoined(gameId, router) {
  router.transitionTo("game", {gameId:gameId})
}

var GamesStore = assign({}, EventEmitter.prototype, {

  "GameStore#joinGame" : function joinGame(action) {
    var user = _.get(action, "user");
    var router = _.get(action, "router");
    var gameId = _.getIn(action, ["game", "_id"]);
    gateway.joinGame(user, gameId, function() {
      onGameJoined(gameId, router);
    });
  },

  "GameStore#updateLobby" : function updateLobbyAction() {
    updateLobby();
  },

  getLobbyGames: function getLobbyGames() {
    return lobbyGames;
  },

  lobbyUpdated: function(games) {
    this.emit(LOBBY_UPDATED_EVENT, games);
  },

  playerGamesUpdated: function(games) {
    this.emit(PLAYER_GAMES_UPDATED_EVENT, games);
  },

  getPlayerGames: function getLobbyGames() {
    return playerGames;
  }

});

var events = require("../utils/events.js");
events.configure(GamesStore, "LobbyUpdated", LOBBY_UPDATED_EVENT);
events.configure(GamesStore, "PlayerGamesUpdated", PLAYER_GAMES_UPDATED_EVENT);

AppDispatcher.autoDispatch(GamesStore);

module.exports = GamesStore;
