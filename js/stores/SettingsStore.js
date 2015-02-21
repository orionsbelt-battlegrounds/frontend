
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var storage = require("../utils/localStorage.js");
var AutoAppDispatcher = require('../dispatcher/AutoAppDispatcher');
var _ = require("mori");

var LOBBY_TAB_CHANGED = "LobbyTabChanged";

var SettingsStore = assign({}, EventEmitter.prototype, {

  "SettingsStore#lobbyTabChanged": function onLobbyTabChanged(action) {
    var tabName = _.get(action, "tabName");
    storage.store("lobby-tab", tabName);
    this.emit(LOBBY_TAB_CHANGED, tabName);
  },

  selectedLobbyTab: function getSelectedLobbyTab() {
    return storage.retrieve("lobby-tab") || "openGames";
  }

});

var events = require("../utils/events.js");
events.configure(SettingsStore, "LobbyTabChanged", LOBBY_TAB_CHANGED);

AutoAppDispatcher.autoDispatch(SettingsStore);

module.exports = SettingsStore;
