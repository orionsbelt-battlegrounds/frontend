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

  logout: function logout() {
    AppDispatcher.dispatch({
      actionType: "CurrentUser#logout"
    });
  }

};

