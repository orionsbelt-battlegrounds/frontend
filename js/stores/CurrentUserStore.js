"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CURRENT_USER_CHANGED_EVENT = "CurrentUserChanged";
var currentUser = null;

function setCurrentUser(user) {
  currentUser = user;
  console.log(currentUser)
  CurrentUserStore.emitChange();
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

  getCurrentUser: function getCurrentUser() {
    return currentUser;
  },

  emitChange: function() {
    this.emit(CURRENT_USER_CHANGED_EVENT);
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
