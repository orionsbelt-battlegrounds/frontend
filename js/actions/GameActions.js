'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CurrentUserStore = require('../stores/CurrentUserStore');
var _ = require("mori");

module.exports = {

  createFriendlyData: function createFriendlyData(user) {
    return _.toClj({
      actionType : "GameStore#createFriendly",
      user : user
    });
  },

  createFriendly: function createFriendly() {
    AppDispatcher.dispatch(this.createFriendlyData());
  },

  joinGameData: function joinGameData(game) {
    return _.toClj({
      actionType : "GameStore#joinGame",
      user : CurrentUserStore.getCurrentUser(),
      game : game
    });
  }, 

  joinGame: function joinGame(game) {
    AppDispatcher.dispatch(this.joinGameData(game));
  }

};

