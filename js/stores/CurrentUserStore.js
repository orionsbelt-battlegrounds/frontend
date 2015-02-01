"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CURRENT_USER_CHANGED_EVENT = "CurrentUserChanged";
var LOGIN_ERRORS_EVENT = "LoginErrors";
var anonRegex = new RegExp('^anonymous', 'i');
var currentUser = null;

function persistLocalStorage(user) {
  if(window.localStorage) {
    if(user) {
      localStorage["currentUser"] = JSON.stringify(user);
    } else {
      localStorage.removeItem("currentUser");
    }
  }
}

function fetchCurrentUser() {
  if(!currentUser && window.localStorage) {
    var raw = window.localStorage["currentUser"]
    if(raw) {
      currentUser = JSON.parse(window.localStorage["currentUser"]);
    }
  }
  if(!currentUser) {
    currentUser = {
      username: "Anonymous+" + (new Date().getTime()) + "-" + (Math.random().toString(36).replace(/[^a-z]+/g, ''))
    };
  }
  return currentUser;
}

var CurrentUserStore = assign({}, EventEmitter.prototype, {

  "CurrentUser#verifyUsername": function(action) {
    // simulate request
    setTimeout(function() {
      if(action.username == "donbonifacio") {
        CurrentUserStore.setCurrentUser({username:"donbonifacio", token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkb25ib25pZmFjaW8iLCJleHAiOjE0MjM0ODk4NTksImlhdCI6MTQyMjYyNTg1OX0.5fFedaFXik7rbEdIPeHgdV7JkdFbginVQUkilYtZ1DU"});
      } else if(action.username == "Pyro") {
        CurrentUserStore.setCurrentUser({username:"Pyro", token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQeXJvIiwiZXhwIjoxNDIzNDg5OTI1LCJpYXQiOjE0MjI2MjU5MjV9.czpW-wXHq9Cgp6-8Hs1mHe9dzXAx2Gz7m4vbzpyDPtI"});
      } else {
        CurrentUserStore.emitChange(LOGIN_ERRORS_EVENT);
      }
    }, 500);
  },

  "CurrentUser#logout": function(action) {
    this.setCurrentUser(null);
  },

  isUserAuthenticated: function isUserAuthenticated() {
    var user = this.getCurrentUser();
    if(user && !anonRegex.test(user.username)) {
      return true;
    }
    return false
  },

  getCurrentUser: function getCurrentUser() {
    return fetchCurrentUser();
  },

  setCurrentUser: function setCurrentUser(user) {
    currentUser = user;
    persistLocalStorage(user);
    this.emitChange(CURRENT_USER_CHANGED_EVENT);
  },


  emitChange: function(event) {
    this.emit(event);
  },

  addChangeListener: function(callback) {
    this.on(CURRENT_USER_CHANGED_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CURRENT_USER_CHANGED_EVENT, callback);
  },

  addLoginErrorsListener: function(callback) {
    this.on(LOGIN_ERRORS_EVENT, callback);
  },

  removeLoginErrorsListener: function(callback) {
    this.removeListener(LOGIN_ERRORS_EVENT, callback);
  }

});

AppDispatcher.register(function(action) {
  if(CurrentUserStore[action.actionType]) {
    CurrentUserStore[action.actionType](action);
  }
});

module.exports = CurrentUserStore;
