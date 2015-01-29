'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {

  verifyUsernameData: function verifyUsernameData(username, password) {
    return {
      actionType: "CurrentUser#verifyUsername",
      username: username,
      password: password
    };
  },

  verifyUsername: function verifyUsername(username, password) {
    AppDispatcher.dispatch(this.verifyUsernameData(username, password));
  },

  logoutData: function logoutData() {
    return { actionType: "CurrentUser#logout"};
  },

  logout: function logout() {
    AppDispatcher.dispatch(this.logoutData);
  }

};

