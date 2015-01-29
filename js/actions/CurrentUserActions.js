'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {

  verifyUsername: function(username, password) {
    AppDispatcher.dispatch({
      actionType: "verifyUsername",
      username: username,
      password: password
    });
  }

};

