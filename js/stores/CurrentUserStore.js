"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var currentUser = null;

var CurrentUserStore = assign({}, EventEmitter.prototype, {

  verifyUsername: function(action) {
    if(action.username == "donbonifacio") {
      currentUser = {username:"donbonifacio", token:"waza"};
    } else if(action.username == "Pyro") {
      currentUser = {username:"Pyro", token:"waza"};
    } else {
      currentUser = null;
    }
    console.log(currentUser)
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
