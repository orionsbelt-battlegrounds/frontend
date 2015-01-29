'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {

  verifyUsername: function(username, password) {
    AppDispatcher.dispatch({
      actionType: "CurrentUser#verifyUsername",
      username: username,
      password: password
    });
  }

};

