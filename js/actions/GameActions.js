'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CurrentUserStore = require('../stores/CurrentUserStore');

module.exports = {

  createFriendlyData: function createFriendlyData(user) {
    return {
      actionType: "GameStore#createFriendly",
      user: CurrentUserStore.getCurrentUser()
    };
  },

  createFriendly: function createFriendly() {
    AppDispatcher.dispatch(this.createFriendlyData());
  }

};

