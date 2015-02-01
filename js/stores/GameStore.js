"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var GAME_CREATED_EVENT = "GameStore#GameCreated";

var GameStore = assign({}, EventEmitter.prototype, {

  "GameStore#createFriendly": function(action) {
    this.emit(GAME_CREATED_EVENT);
  },

  emitChange: function(event) {
    this.emit(event);
  },

  addGameCreatedListener: function(callback) {
    this.on(GAME_CREATED_EVENT, callback);
  },

  removeGameCreatedListener: function(callback) {
    this.removeListener(GAME_CREATED_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {
  if(GameStore[action.actionType]) {
    GameStore[action.actionType](action);
  }
});

module.exports = GameStore;
