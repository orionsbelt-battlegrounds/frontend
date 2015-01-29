'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {

  verifyUsername: function verifyUsername(username, password) {
    AppDispatcher.dispatch({
      actionType: "CurrentUser#verifyUsername",
      username: username,
      password: password
    });
  },

  logout: function logout() {
    AppDispatcher.dispatch({
      actionType: "CurrentUser#logout"
    });
  }

};

