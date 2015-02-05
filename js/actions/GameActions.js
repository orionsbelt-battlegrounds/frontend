'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CurrentUserStore = require('../stores/CurrentUserStore');
var _ = require("mori");

var CREATE_FRIENDLY_DATA = _.toClj({actionType: "GameStore#createFriendly"});

module.exports = {

  createFriendlyData: function createFriendlyData(user) {
    return _.assoc(CREATE_FRIENDLY_DATA, "user", user);
  },

  createFriendly: function createFriendly() {
    AppDispatcher.dispatch(this.createFriendlyData());
  }

};

