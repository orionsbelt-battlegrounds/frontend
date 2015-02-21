"use strict";

var AppDispatcher = require('../dispatcher/AutoAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require("mori");
var gateway = require("../utils/gateway.js");
var CurrentUserStore = require("./CurrentUserStore.js");

var GAME_CREATED_EVENT = "GameStore#GameCreated";
var GAME_LOADED_EVENT = "GameStore#GameLoaded";

var GameStore = assign({}, EventEmitter.prototype, {

  "GameStore#loadGame": function(action) {
    var user = CurrentUserStore.getCurrentUser();
    var gameId = _.get(action, "gameId");
    gateway.loadGame(user, gameId, function afterLoadGame(game) {
      GameStore.emit(GAME_LOADED_EVENT, _.toClj(game));
    });
  },

  "GameStore#createFriendly": function(action) {
    var user = CurrentUserStore.getCurrentUser();
    gateway.createFriendly(user, {}, function afterCreate(game) {
      GameStore.emit(GAME_CREATED_EVENT, _.toClj(game));
    });
  }

});

var events = require("../utils/events.js");
events.configure(GameStore, "GameLoaded", GAME_LOADED_EVENT);
events.configure(GameStore, "GameCreated", GAME_CREATED_EVENT);

AppDispatcher.autoDispatch(GameStore);

module.exports = GameStore;
