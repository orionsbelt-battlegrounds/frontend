'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require("mori");

module.exports = {

  verifyUsernameData: function verifyUsernameData(username, password) {
    return _.toClj({
      actionType: "CurrentUser#verifyUsername",
      username : username,
      password : password
    });
  },

  verifyUsername: function verifyUsername(username, password) {
    AppDispatcher.dispatch(this.verifyUsernameData(username, password));
  },

  logoutData: function logoutData() {
    return _.toClj({ actionType: "CurrentUser#logout"});
  },

  logout: function logout() {
    AppDispatcher.dispatch(this.logoutData());
  }

};

