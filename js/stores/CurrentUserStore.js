"use strict";

var AppDispatcher = require('../dispatcher/AutoAppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require("mori");
var debounce = require('debounce');
var storage = require("../utils/localStorage.js");
var gateway = require("../utils/gateway.js");

var CURRENT_USER_CHANGED_EVENT = "CurrentUserChanged";
var LOGIN_ERRORS_EVENT = "LoginErrors";
var anonRegex = new RegExp('^anonymous', 'i');
var currentUser = null;

function persistLocalStorage(user) {
  storage.store("currentUser", user)
}

var prepareAnonymousUser = debounce(function prepareAnonymousUser() {
  var anonUsername = "anonymous:" + (new Date().getTime()) + "-" + (Math.random().toString(36).replace(/[^a-z]+/g, ''));
  gateway.anonymize(anonUsername, function onAnonymize(data) {
    CurrentUserStore.setCurrentUser({
      username: anonUsername,
      token: data.token
    });
  });
}, 1000, true);

function fetchCurrentUser() {
  if(!currentUser) {
    currentUser = storage.retrieve("currentUser")
  }
  if(!currentUser) {
    prepareAnonymousUser();
  }
  return currentUser;
}

var CurrentUserStore = assign({}, EventEmitter.prototype, {

  "CurrentUser#verifyUsername": function(action) {
    var username = _.get(action, "username");
    // simulate request
    setTimeout(function() {
      if(username == "donbonifacio") {
        CurrentUserStore.setCurrentUser({username:"donbonifacio", token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkb25ib25pZmFjaW8iLCJleHAiOjE0MjM0ODk4NTksImlhdCI6MTQyMjYyNTg1OX0.5fFedaFXik7rbEdIPeHgdV7JkdFbginVQUkilYtZ1DU"});
      } else if(username == "Pyro") {
        CurrentUserStore.setCurrentUser({username:"Pyro", token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQeXJvIiwiZXhwIjoxNDIzNDg5OTI1LCJpYXQiOjE0MjI2MjU5MjV9.czpW-wXHq9Cgp6-8Hs1mHe9dzXAx2Gz7m4vbzpyDPtI"});
      } else {
        CurrentUserStore.emit(LOGIN_ERRORS_EVENT);
      }
    }, 500);
  },

  "CurrentUser#logout": function(action) {
    this.setCurrentUser(null);
  },

  isUserAuthenticated: function isUserAuthenticated() {
    var user = this.getCurrentUser();
    if(!user) {
      return false;
    }
    var username = _.get(user, "username");
    if(!anonRegex.test(username)) {
      return true;
    }
    return false
  },

  getCurrentUser: function getCurrentUser() {
    return fetchCurrentUser();
  },

  setCurrentUser: function setCurrentUser(user) {
    currentUser = _.toClj(user);
    persistLocalStorage(user);
    this.emit(CURRENT_USER_CHANGED_EVENT);
  }

});

var events = require("../utils/events.js");
events.configure(CurrentUserStore, "Change", CURRENT_USER_CHANGED_EVENT);
events.configure(CurrentUserStore, "LoginErrors", LOGIN_ERRORS_EVENT);

AppDispatcher.autoDispatch(CurrentUserStore);

module.exports = CurrentUserStore;
