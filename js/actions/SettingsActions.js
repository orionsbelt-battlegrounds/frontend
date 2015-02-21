'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var _ = require("mori");

module.exports = {

  lobbyTabChangedData: function lobbyTabChangedData(tabName) {
    return _.toClj({
      actionType : "SettingsStore#lobbyTabChanged",
      tabName : tabName
    });
  },

  lobbyTabChanged: function loadGame(tabName) {
    AppDispatcher.dispatch(this.lobbyTabChangedData(tabName));
  }

};

