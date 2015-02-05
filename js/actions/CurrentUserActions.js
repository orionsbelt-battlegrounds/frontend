'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require("mori");

var LOGOUT_DATA = _.toClj({ actionType: "CurrentUser#logout"});
var VERIFY_USERNAME_DATA = _.toClj({actionType: "CurrentUser#verifyUsername"});

module.exports = {

  verifyUsernameData: function verifyUsernameData(username, password) {
    var withUser = _.assoc(VERIFY_USERNAME_DATA, "username", username);
    return _.assoc(withUser, "password", password);
  },

  verifyUsername: function verifyUsername(username, password) {
    AppDispatcher.dispatch(this.verifyUsernameData(username, password));
  },

  logoutData: function logoutData() {
    return LOGOUT_DATA;
  },

  logout: function logout() {
    AppDispatcher.dispatch(this.logoutData());
  }

};

