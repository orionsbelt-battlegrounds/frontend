"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CurrentUserStore = assign({}, EventEmitter.prototype, {

  verifyUsername: function(action) {
    console.log("Verify")
    console.log(action)
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {
  if(CurrentUserStore[action.actionType]) {
    CurrentUserStore[action.actionType](action);
  }
});

module.exports = CurrentUserStore;
