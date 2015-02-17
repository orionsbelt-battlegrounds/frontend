"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
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
  },

  emitChange: function(event) {
    this.emit(event);
  },

  addGameCreatedListener: function(callback) {
    this.on(GAME_CREATED_EVENT, callback);
  },

  removeGameCreatedListener: function(callback) {
    this.removeListener(GAME_CREATED_EVENT, callback);
  },

  addGameLoadedListener: function(callback) {
    this.on(GAME_LOADED_EVENT, callback);
  },

  removeGameLoadedListener: function(callback) {
    this.removeListener(GAME_LOADED_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {
  var actionType = _.get(action, "actionType");
  if(GameStore[actionType]) {
    GameStore[actionType](action);
  }
});

module.exports = GameStore;
