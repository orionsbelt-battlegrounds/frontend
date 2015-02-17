'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CurrentUserStore = require('../stores/CurrentUserStore');
var _ = require("mori");

module.exports = {

  loadGameData: function loadGameData(gameId) {
    return _.toClj({
      actionType : "GameStore#loadGame",
      gameId : gameId
    });
  },

  loadGame: function loadGame(gameId) {
    AppDispatcher.dispatch(this.loadGameData(gameId));
  },

  createFriendlyData: function createFriendlyData(user) {
    return _.toClj({
      actionType : "GameStore#createFriendly",
      user : user
    });
  },

  createFriendly: function createFriendly() {
    AppDispatcher.dispatch(this.createFriendlyData());
  },

  joinGameData: function joinGameData(game, router) {
    return _.toClj({
      actionType : "GameStore#joinGame",
      user : CurrentUserStore.getCurrentUser(),
      game : game,
      router : router
    });
  }, 

  joinGame: function joinGame(game, router) {
    AppDispatcher.dispatch(this.joinGameData(game, router));
  },

  updateLobbyData: function updateLobbyData() {
    return _.toClj({
      actionType : "GameStore#updateLobby"
    });
  }, 

  updateLobby: function updateLobby() {
    AppDispatcher.dispatch(this.updateLobbyData());
  }


};

