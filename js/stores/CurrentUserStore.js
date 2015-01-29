"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CURRENT_USER_CHANGED_EVENT = "CurrentUserChanged";
var currentUser = null;

function setCurrentUser(user) {
  currentUser = user;
  CurrentUserStore.emitChange(CURRENT_USER_CHANGED_EVENT);
}

var CurrentUserStore = assign({}, EventEmitter.prototype, {

  "CurrentUser#verifyUsername": function(action) {
    // simulate request
    setTimeout(function() {
      if(action.username == "donbonifacio") {
        setCurrentUser({username:"donbonifacio", token:"waza"});
      } else if(action.username == "Pyro") {
        setCurrentUser({username:"Pyro", token:"waza"});
      }
    }, 500);
  },

  "CurrentUser#logout": function(action) {
    setCurrentUser(null);
  },

  getCurrentUser: function getCurrentUser() {
    return currentUser;
  },

  emitChange: function(event) {
    this.emit(event);
  },

  addChangeListener: function(callback) {
    this.on(CURRENT_USER_CHANGED_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CURRENT_USER_CHANGED_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {
  if(CurrentUserStore[action.actionType]) {
    CurrentUserStore[action.actionType](action);
  }
});

module.exports = CurrentUserStore;
